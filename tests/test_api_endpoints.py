import os
os.environ["OFFLINE_MODE"] = "true"

from fastapi.testclient import TestClient
from Raikou.api.app.main import app


client = TestClient(app)


def test_list_models_endpoint():
    r = client.get("/models")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert any(i["maker"] == "Hyundai" for i in items)


def test_grant_endpoint_defaults():
    r = client.get("/models/kia-ev6/grant", params={"regionId":"seoul"})
    assert r.status_code == 200
    data = r.json()
    assert data["modelId"] == "kia-ev6"
    assert data["breakdown"]["national"] >= 0

