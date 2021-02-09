const request = require("supertest");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mockAxios = new MockAdapter(axios);

process.env.DATA_CSV = "https://test-api.csv";
process.env.IMAGE_REPO = "https://image-repo/";
process.env.IMAGE_TYPE = "jpg";

const app = require("./app");

const mockCSV = `id,name,price
1,Clean Code,52.5`;

describe("app", () => {
  beforeEach(() => {
    mockAxios.reset();

    mockAxios.onGet("https://test-api.csv").reply(200, mockCSV);
  });

  it("should render todo title", async () => {
    return request(app)
      .get("/shop")
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject([
          {
            id: "1",
            imageUrl: "https://image-repo/1.jpg",
            name: "Clean Code",
            price: "52.5",
          },
        ]);
      });
  });
});
