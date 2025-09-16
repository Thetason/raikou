전기차보조금조회 — 개발플랜.md (v0.9)
0) 원라인

전국 지자체 EV 보조금 잔여·일정·차종별 예상 실구매가를 ‘한 화면’에서 즉시 계산·구독.

1) 목표와 성공지표
제품 목표

전국 지자체 보조금 잔여(대수/예산), 접수·출고 진행률, 접수 가능 시점/마감 카운트다운, 차종별(트림별) 보조금 적용가를 한 번에 제공.

헤이딜러식 카드·피드형 UI로 비전문가도 10초 내 핵심 판단.

핵심 KPI

TTFD(첫 결정시간) ≤ 10초

지역·차종 알림 구독 전환율 ≥ 15%

데이터 최신성: 중앙/지자체 공고 반영 24h 이내 자동 동기화 95%

계산 정확도: 공고 기준 대비 ±1% 이내(가이던스 범주 표시)

2) 레퍼런스 & 공식 데이터 소스

무공해차 통합누리집(환경부/한국환경공단)

구매보조금 지급현황(지자체별 접수·출고·잔여) 및 지급대상 차종 목록. 
Ev.or.kr
+3
Ev.or.kr
+3
Ev.or.kr
+3

공공데이터포털(KECO/KEM 등) 오픈API

전기차 구매보조금 지급현황(시·군·구/차종/연도별) 파일·API, 지역별 등록/신청 현황. 
Data.go
+2
Data.go
+2

자동차 표시연비/전비·1회충전거리(전기차 성능 DB). 
Data.go
+1

정책·지침(2025)

전기승용 국비 최대 580만 원, 100%/50% 구간(5,300만 원/8,500만 원) 기준, 청년·다자녀 추가지원 등. 
m.me.go.kr
+2
Korea.kr
+2

지자체 예: 서울시 하반기 공고(기간·지원액). 
news.seoul.go.kr
+1

UI 벤치마크: 헤이딜러 웹/앱 UX 패턴. 
헤이딜러
+2
Medium
+2

타사 레퍼런스(수요 검증 관찰치): Donut, longrange(집계 방식 아이디어·수요 참고). 공식 소스 아님(보조근거로 사용 금지). 
donut.im
+1

주: 지침 세부 계산 로직은 매년 개편 가능. 업무처리지침 전문 기준으로 버전 관리 및 계산식 모듈화. 
Ministry of Environment
+1

3) 사용자 시나리오 (핵심 3가지)

지역→차종: “서울 거주, EV6 사려함” → 서울 잔여/마감 D‑Day → EV6 국비/시비·추가지원 시나리오 → 예상 실구매가와 “지금 신청/대기” 판단.

차종→지역: “아이오닉 6, 내가 사는 3곳 비교” → 3개 지자체 보조금·잔여·예상가 카드 비교 → 알림 구독.

출시·예정 DB 탐색: “올해/내년 출시 예정 EV” → 스펙/전비/1회충전거리/예상가격 범위 → 보조금 가정치로 예상가 민감도 확인.

4) 기능 명세 (FSD)
4.1 보조금 실시간 현황

지자체 선택: 시·도→시·군·구 계층 선택 또는 위치·검색.

현황 카드: 공고대수, 접수·출고 누계, 잔여 대수/비율, 전일 대비 증감(스파크라인).

카운트다운: 공고 시작/마감/예산소진 D‑Day.

데이터 출처 배지 + 타임스탬프.

4.2 차종별 보조금 계산기

차종/트림 선택 → 국비(차종별 단가) + 지방비(지역 정책) + 추가지원(청년/다자녀/안전·혁신 등) → 보조금 합계 → 예상 실구매가 = MSRP – 보조금

가격구간 규칙(5,300만/8,500만) 자동 적용. 
Easy Law

시나리오 토글: 제조사 할인 반영/미반영(정부 인센티브 연동 구간 안내). 
Korea.kr

민감도 슬라이더: MSRP 변동 ±x%, 지방비 변동 시뮬레이션.

4.3 모델 DB (출시/예정)

출시 모델: 전비·1회충전거리·배터리·구동/차급·충전규격, 안전/혁신요건 충족 여부. 
Data.go

지급대상 차종 뷰: ev.or.kr 공개 항목 매핑(국비 단가/조건). 
Ev.or.kr

예정 모델: 제조사 PR/공식 뉴스룸·보도자료 기반 수동 검수 + 근거 링크(명확히 “예정/미확정” 표기).

4.4 알림

조건 구독: [지역+차종], [예산 소진률 x%], [공고 시작/마감], [차종 국비 단가 갱신].

채널: 이메일/웹푸시/카카오 알림톡(추후).

4.5 비교/공유

지역 3곳 비교, 차종 3개 비교(카드형).

공유용 퍼머링크 + 이미저블 카드(Open Graph).

4.6 백오피스(CMS)

지자체 정책 테이블 직접 수정(예산 변동/추가지원 항목).

모델/트림 관리(가격 범위·트림 옵션·출시/단종 상태).

데이터 출처·증빙 링크 필수화 → 변경 이력(감사 로그).

5) 계산 로직 (요약)

공식 지침을 우선 적용. 지자체 특례는 지역별 Rule로 오버라이드.

국비 보조금(차종별 단가): ev.or.kr ‘지급대상 차종’ 공개 단가를 참조. 
Ev.or.kr

가격구간 적용(전기승용):

5,300만 원 미만: 국비 100%

5,300만 ~ 8,500만 원 미만: 국비 50%

8,500만 원 이상: 미지원 
Easy Law

지방비 보조금: 지자체 공고 단가 또는 지침 내 비례식(예: 중·대형 기준 국비/580만 비율 적용 등)·특례 반영. 
Easy Law

추가지원: 청년 국비의 20%, 다자녀 등 공고 기준 합산(중복 가능 범위는 지침/지자체 공고대로). 
Korea.kr
+1

제조사 할인 인센티브 연동: 2025 체계의 할인비례 인센티브 구간을 별도 플래그로 계산(정책 변경 대응). 
Korea.kr

예상 실구매가 = MSRP(트림 기준) − (국비 적용액 + 지방비 + 추가지원 + 인센티브(옵션))

MSRP 데이터는 제조사 공식 가격 또는 공시 가격(트림 시작가)을 기본으로 하되, 확정 불가시 **범위(최소~최대)**로 제공(법적 고지 포함).

6) 데이터 수집·동기화 설계
파이프라인(ETL)

Source A (공식 API): 공공데이터포털(KECO) 보조금 현황 Pull(5~15분 간격, 레이트리밋 준수). 
Data.go

Source B (웹크롤링): ev.or.kr 동적 페이지 헤드리스 브라우저 스냅샷→DOM 파서(차종 대상/현황·공고 링크). 변경 감지(Diff) 저장. 
Ev.or.kr
+1

Source C (지자체 공고): 17개 시·도 Portals RSS/스크래핑 → 기간/단가/대상·추가지원 정규화(서울 표준 예시 참고). 
news.seoul.go.kr

Source D (성능/전비 DB): 한국에너지공단 API 주간 동기화 + 모델/트림 매핑. 
Data.go

Source E (MSRP·예정 모델): 제조사 공식 페이지/보도자료(수동 검수 + 증빙 URL).

품질·감사

스키마 밸리데이션(단위, 통화, 구간 규칙).

이상탐지: 전일 대비 변동률 > 30% 알람.

출처·수집시각 컬럼 필수, CMS에서 히스토리 diff 비교.

7) 시스템 아키텍처
[Ingestion Workers] --(ETL Queue)--> [Data Normalizer] --> [PostgreSQL]
                                  \--> [Object Storage(증빙/공고PDF)]
[Admin CMS] <--> [API Gateway (NestJS/FastAPI)] <--> [Redis Cache]
[Web(Next.js, SSR)] <--> [API]  |  [Job Scheduler(BullMQ/Arq)]
[Auth(Keycloak/Cognito)]         |  [Observability(ELK+Prom/Grafana)]


프런트: Next.js(SSR/ISR), React Query, Tailwind or Chakra.

백엔드 API: NestJS(Typescript) 또는 FastAPI(Python).

인프라: AWS(ECS Fargate/EKS) + RDS(PostgreSQL 15) + ElastiCache(Redis) + S3 + CloudFront.

CI/CD: GitHub Actions → IaC(Terraform).

보안: WAF, SSM Parameter Store, Secrets Manager, OWASP Top10 점검.

8) 데이터베이스 스키마(핵심 테이블)
지역·프로그램

regions(id, sido, sigungu, code, geojson_id)

subsidy_programs(id, region_id, year, phase, start_dt, end_dt, status, notice_url, source_id)

subsidy_status_snapshots(id, program_id, vehicle_type, announced_qty, applied_qty, released_qty, remaining_qty, snapshot_ts)

규칙·금액

national_grants(id, model_id, year, vehicle_type, base_amount, conditions, source_id)

local_rules(id, region_id, year, vehicle_type, rule_type[fixed/ratio/formula], formula, cap, note, source_id)

additional_supports(id, type[youth,multichild,safety,smallbiz], basis, amount_or_ratio, cap, region_id|null, year)

차량 DB

makers(id, name, country, site_url)

models(id, maker_id, name_ko, name_en, segment, drive_type, launch_status[launched/upcoming], launch_dt_est, official_page)

trims(id, model_id, trim_name, msrp_min, msrp_max, fast_charge, slow_charge)

ev_specs(model_id, battery_kwh, range_city, range_highway, range_combined_km, eff_km_per_kwh, weight, homologation_std, source_id) 
Data.go

매핑·출처·이력

source_docs(id, origin[url], org[name], kind[api/web/pdf], fetched_at, hash)

price_history, rule_history, status_history(테이블별 Change Log)

9) API 설계(초안)

GET /regions?query= : 지역 검색/오토완성

GET /programs/{regionId}/current : 현행 공고·기간·카운트다운

GET /programs/{id}/status : 접수/출고/잔여 스냅샷(일·주간)

GET /models?filter= : 차종/전비/주행거리/급

GET /models/{id}/grant?regionId=&trimId=&flags= : 보조금 계산 결과(내역 포함)

POST /alerts : 알림 구독(이메일/푸시)

GET /docs/sources/{entity} : 출처·버전 로그

응답 공통: calc_breakdown(국비/지방비/추가/인센티브·근거), assumptions(가정), disclaimer.

10) 프런트엔드 UX 스펙 (헤이딜러식 패턴 적용)

홈 헤더: 검색바(“지역·차종을 입력하세요”) + 고정 상단 잔여 대시보드.

카드 피드:

지역카드: [잔여 대수/소진률 게이지] [D‑Day] [어제 대비] [공고 링크].

차종카드: [모델/트림] [국비/지방비/추가 내역] [예상 실구매가 큰 숫자] [근거 펼치기].

상세 페이지:

지역 상세: 일/주 스파크라인, 프로그램 히스토리, 공고 PDF 링크.

모델 상세: 전비·주행거리·배터리·충전 규격(공식 데이터), 정책 요건 충족 여부 배지. 
Data.go

UX 마이크로카피: “공식 출처 기준”, “예상가(가정 포함)”, “정확한 금액은 지자체/제조사 공고 상이”.

Skeleton·오류 상태: 네트워크/소스지연 시 가이드 문구 + 마지막 성공 갱신 시각 표시.

접근성: 키보드 탐색, ARIA 라벨, 명도 대비 4.5:1.

11) 크롤링/동기화 디테일

ev.or.kr: 동적 로딩 → Puppeteer/Playwright로 렌더 → 표 파싱 → 정규화. 속도 개선 위해 Headless Pool + ETag/If-Modified-Since. 
Ev.or.kr
+1

지자체 공고: RSS/공지 리스트 → 공고 PDF/HTML 파서(기간·금액·대상 RegEx) → 휴리스틱 QA + 수동 검수 큐.

API 백오프·캐시: 공공데이터 레이트리밋 감안, 5~15분 캐시 + 변경 감지 시 즉시 무효화.

12) 법적·정책 준수

공공데이터 이용허락범위 확인(출처표시/비영리 등 조건 준수). 
Data.go

정확성 고지/면책: “정책 변동·지자체 공고 우선, 본 서비스는 참고용”.

개인정보: VIN/차량번호 조회 기능은 미저장 원칙 + 전송 암호화.

상표·저작권: 제조사 로고·이미지 사용은 가이드 준수(또는 미사용 텍스트 위주).

13) 비기능 요구사항(NFR)

성능: p95 TTFB < 500ms(API 캐시), p95 LCP < 2.0s(SSR+CDN 프리렌더).

가용성: 99.9% (캐시 폴백 + 최근 스냅샷 제공).

관측성: APM(트랜잭션/외부콜), 로그 상관키, 예외 알람(Slack/PagerDuty).

보안: OWASP ASVS L2, 주기적 종속성 스캔, 비공개 Admin 네트워크.

14) 테스트 전략

단위: 계산 엔진(가격구간, 비례식, 중복지원) 케이스 100+.

통합: ETL→정규화→계산→API→UI E2E(Nightly).

회귀: 공고 변경 샘플 재현 테스트(스냅샷 기반).

카나리: 일부 지역만 실시간 갱신→이상탐지 통과 후 전역 반영.

15) 롤아웃(마일스톤 순서, 기간 미기재)

데이터 핵심: 국비 단가·지자체 현황 API/크롤러, 계산 코어 v1.0

UI 코어: 홈/지역/차종 카드 + 상세 + 알림 구독

백오피스: 정책 Rule 편집·감사로그

예정 모델 DB + MSRP 범위 & 시나리오

제조사 할인 인센티브 연동 옵션 계산

오픈 알파(지역 일부) → 지표 검증 → 전국 확장

16) 리스크 & 대응

지침 변경/예산 추가 배정: 계산엔진 규칙 테이블화(Rule DSL) 즉시 반영.

동적 페이지 구조 변경: 크롤러 DOM 시그니처 테스트 + 백업 소스(API/파일데이터) 폴백. 
Data.go

MSRP 변동/트림 다양성: 가격 범위 제공 + 출처 링크·갱신일 표기.

과도한 트래픽/레이트리밋: 지역·차종 단위 캐시, 정적 프리컴퓨트.

17) DevOps & 운영

IaC: Terraform으로 네트워크, RDS, ECS, S3, CloudFront, WAF 선언.

배포: main → staging 자동, 승인 후 prod(블루/그린).

백업: DB 7일 PITR, Object Storage 버전닝.

모니터링 대시보드: 데이터 신선도(소스별 마지막 성공 페치 시각/오류율).

18) SEO/성장

SSR·정적 OG 카드(지역/차종 별).

“서울 전기차 보조금”, “EV6 보조금”, “전기차 보조금 잔여” 키워드 랜딩.

뉴스/공지 크롤링 요약 카드(출처 배지)로 재방문 유도.

19) 예시 화면 구조(요약 와이어)

/ (홈): 검색바 + “내 위치 근처 상위 5개 지자체 잔여” 카드/게이지.

/region/서울특별시: 잔여/접수·출고, D‑Day, 공고 링크, 차종별 지원액 테이블.

/model/기아-EV6: 전비·거리·배터리, 국비 단가/가격구간, 지역별 예상가 비교.

/compare?regions=서울,성남,고양 또는 /compare?models=EV6,아이오닉6,모델3

20) 코어 모듈 설계(간략)

calc-engine:

입력: modelId, trimId, regionId, msrp, flags{youth,multiChild,discountAmt...}

출력: breakdown{national,local,extra,incentive}, finalPrice, notes[]

규칙 소스: national_grants, local_rules, additional_supports.

etl-evor: ev.or.kr 대상/현황 파서(헤드리스) + JSON 아웃풋. 
Ev.or.kr

etl-keco: KECO 현황 API 클라이언트 + 정규화. 
Data.go

etl-kem: KEM 전비/거리 API 클라이언트(모델 매칭). 
Data.go

21) 고지(Disclaimer) 예시

본 서비스의 보조금 계산은 환경부 지침·지자체 공고 및 공식 데이터 기준으로 산출된 참고값입니다. 최종 지원액·자격·기간은 지자체 공고와 무공해차 통합누리집 고시를 반드시 확인하시기 바랍니다. 
Ministry of Environment
+2
Easy Law
+2

22) 부록 — 정책 팩트 시트(2025, 구현에 필요한 최소치)

전기승용 국비 최대 580만 원(’25). 
m.me.go.kr
+1

가격구간: 5,300만 원 미만 100%, 5,300만~8,500만 원 미만 50%, 8,500만 원 이상 미지원. 
Easy Law

청년 생애 첫차 등 추가지원 항목 존재(지자체별 상이, 예: 서울 최대 630만 원(국비 580+시비 50) 구조). 
news.seoul.go.kr

지자체 현황/공고/차종 대상은 무공해차 통합누리집에서 확인 가능. 
Ev.or.kr

마지막 정리 — 지금부터 개발에 착수할 우선 작업(체크리스트)

 Postgres 스키마 마이그레이션 생성(§8)

 etl-keco API 키 발급·테스트(샘플 파서 + 스케줄러) 
Data.go

 etl-evor 헤드리스 크롤러 POC(리스트/표 파싱 안정화) 
Ev.or.kr

 calc-engine 규칙 테이블 + 단위 테스트 50케이스

 Next.js SSR 기본 레이아웃 + 지역카드/차종카드 컴포넌트

 Admin CMS(지역 Rule/추가지원 편집 + 감사로그)

 공개 베타 범위: 수도권 1차 → 데이터 신선도/정확도 대시보드로 검증

필요 시, 위 문서를 **Repository 루트의 docs/development-plan.md**로 커밋하고, issues로 각 항목을 태스크화하면 곧바로 코딩(코덱스) 단계로 들어갈 수 있습니다. 이 텍스트를 기반으로 개발해봐

