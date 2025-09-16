-- PostgreSQL schema for EV Subsidy Service (core tables)
-- v0.1 — aligns with §8 of the plan

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- regions & programs
CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sido TEXT NOT NULL,
  sigungu TEXT,
  code TEXT UNIQUE,
  geojson_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS source_docs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  origin TEXT NOT NULL,
  org TEXT,
  kind TEXT CHECK (kind IN ('api','web','pdf')),
  fetched_at TIMESTAMPTZ NOT NULL,
  hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subsidy_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  year INT NOT NULL,
  phase TEXT,
  start_dt TIMESTAMPTZ,
  end_dt TIMESTAMPTZ,
  status TEXT,
  notice_url TEXT,
  source_id UUID REFERENCES source_docs(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subsidy_status_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID NOT NULL REFERENCES subsidy_programs(id) ON DELETE CASCADE,
  vehicle_type TEXT NOT NULL, -- 'passenger','van','truck', etc.
  announced_qty INT,
  applied_qty INT,
  released_qty INT,
  remaining_qty INT,
  snapshot_ts TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- maker / model / trims / specs
CREATE TABLE IF NOT EXISTS makers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT,
  site_url TEXT
);

CREATE TABLE IF NOT EXISTS models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  maker_id UUID NOT NULL REFERENCES makers(id) ON DELETE CASCADE,
  name_ko TEXT NOT NULL,
  name_en TEXT,
  segment TEXT,
  drive_type TEXT,
  launch_status TEXT CHECK (launch_status IN ('launched','upcoming')) DEFAULT 'launched',
  launch_dt_est DATE,
  official_page TEXT
);

CREATE TABLE IF NOT EXISTS trims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
  trim_name TEXT NOT NULL,
  msrp_min INTEGER, -- KRW
  msrp_max INTEGER, -- KRW
  fast_charge TEXT,
  slow_charge TEXT
);

CREATE TABLE IF NOT EXISTS ev_specs (
  model_id UUID PRIMARY KEY REFERENCES models(id) ON DELETE CASCADE,
  battery_kwh NUMERIC(6,2),
  range_city INTEGER,
  range_highway INTEGER,
  range_combined_km INTEGER,
  eff_km_per_kwh NUMERIC(5,2),
  weight INTEGER,
  homologation_std TEXT,
  source_id UUID REFERENCES source_docs(id)
);

-- grants & rules
CREATE TABLE IF NOT EXISTS national_grants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
  year INT NOT NULL,
  vehicle_type TEXT NOT NULL,
  base_amount INTEGER NOT NULL, -- KRW
  conditions JSONB,
  source_id UUID REFERENCES source_docs(id),
  UNIQUE(model_id, year, vehicle_type)
);

CREATE TABLE IF NOT EXISTS local_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  year INT NOT NULL,
  vehicle_type TEXT NOT NULL,
  rule_type TEXT NOT NULL CHECK (rule_type IN ('fixed','ratio','formula')),
  formula TEXT, -- e.g., JSON or expression text
  cap INTEGER, -- KRW
  note TEXT,
  source_id UUID REFERENCES source_docs(id),
  UNIQUE(region_id, year, vehicle_type)
);

CREATE TABLE IF NOT EXISTS additional_supports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('youth','multichild','safety','smallbiz','other')),
  basis TEXT, -- 'national_percentage' | 'fixed' | 'local_percentage' etc.
  amount_or_ratio NUMERIC(8,4) NOT NULL,
  cap INTEGER,
  region_id UUID REFERENCES regions(id),
  year INT,
  note TEXT
);

-- histories (lightweight)
CREATE TABLE IF NOT EXISTS price_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trim_id UUID NOT NULL REFERENCES trims(id) ON DELETE CASCADE,
  msrp_min INTEGER,
  msrp_max INTEGER,
  effective_from TIMESTAMPTZ NOT NULL,
  source_id UUID REFERENCES source_docs(id)
);

CREATE TABLE IF NOT EXISTS rule_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  local_rule_id UUID NOT NULL REFERENCES local_rules(id) ON DELETE CASCADE,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  old_value JSONB,
  new_value JSONB
);

CREATE TABLE IF NOT EXISTS status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID NOT NULL REFERENCES subsidy_programs(id) ON DELETE CASCADE,
  snapshot_ts TIMESTAMPTZ NOT NULL,
  payload JSONB NOT NULL
);

-- basic indices
CREATE INDEX IF NOT EXISTS idx_regions_sido_sigungu ON regions(sido, sigungu);
CREATE INDEX IF NOT EXISTS idx_programs_region_year ON subsidy_programs(region_id, year);
CREATE INDEX IF NOT EXISTS idx_snapshots_program_ts ON subsidy_status_snapshots(program_id, snapshot_ts DESC);
CREATE INDEX IF NOT EXISTS idx_models_maker ON models(maker_id);
CREATE INDEX IF NOT EXISTS idx_trims_model ON trims(model_id);

