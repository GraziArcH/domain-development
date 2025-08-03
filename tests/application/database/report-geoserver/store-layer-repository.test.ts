import { DatabaseHelper, MockReportGeoserverRepository, StoreLayerRepository } from "@/application/framework";
import { StoreLayerEntityModel, StoreLayerNameValueObject } from "@/domain/report-geoserver";
import { IdValueObject } from "@/domain/shared";

describe("StoreLayerRepository", () => {
	const databaseHelper = new DatabaseHelper("report-geoserver");
	const storeLayerRepository = new StoreLayerRepository(databaseHelper);
	const mockReportGeoserverRepository = new MockReportGeoserverRepository(databaseHelper);

	beforeEach(async () => {
		await databaseHelper.connect();
		await mockReportGeoserverRepository.createMocks();
	});

	afterEach(async () => {
		await mockReportGeoserverRepository.clearTables();
		await databaseHelper.disconnect();
	});

	describe("create", () => {
		it("should create a new store layer", async () => {
			const storeLayer = StoreLayerEntityModel.create({
				id: 1,
				idWorkspace: 1,
				name: "Store Layer Name",
				description: "Description",
				type: "Vector",
				endpoint: "http://example.com/endpoint",
				createdBy: 1
			}) as StoreLayerEntityModel;

			const result = await storeLayerRepository.create(storeLayer);

			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});
	});

	describe("getById", () => {
		it("should get store layer by ID", async () => {
			const storeLayerId = IdValueObject.create(1) as IdValueObject;

			const result = await storeLayerRepository.getById(storeLayerId);

			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});

		it("should return null if store layer does not exist", async () => {
			const storeLayerId = IdValueObject.create(9999) as IdValueObject;

			const result = await storeLayerRepository.getById(storeLayerId);

			expect(result).toBeNull();
		});
	});

	describe("getByName", () => {
		it("should get store layer by name", async () => {
			const storeLayername = StoreLayerNameValueObject.create("Store Layer 1") as StoreLayerNameValueObject;

			const result = await storeLayerRepository.getByName(storeLayername);

			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});

		it("should return null if store layer does not exist", async () => {
			const storeLayerName = StoreLayerNameValueObject.create("not found") as StoreLayerNameValueObject;

			const result = await storeLayerRepository.getByName(storeLayerName);

			expect(result).toBeNull();
		});
	});


	describe("getAll", () => {
		it("should get all store layers", async () => {
			const result = await storeLayerRepository.getAll();

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof StoreLayerEntityModel)).toBeTruthy();
		});
	});

	describe("update", () => {
		it("should update an existing store layer", async () => {
			const storeLayer = StoreLayerEntityModel.create({
				id: 1,
				idWorkspace: 1,
				name: "Updated Store Layer Name",
				description: "Description",
				type: "Vector",
				endpoint: "http://example.com/endpoint",
				createdBy: 1
			}) as StoreLayerEntityModel;

			const result = await storeLayerRepository.update(storeLayer);

			expect(result).toBeInstanceOf(StoreLayerEntityModel);
			expect(result.name.value).toEqual("Updated Store Layer Name");
		});
	});

	describe("delete", () => {
		it("should delete store layer", async () => {
			const storeLayerId = IdValueObject.create(1) as IdValueObject;

			const result = await storeLayerRepository.delete(storeLayerId);

			expect(result).toBeInstanceOf(StoreLayerEntityModel);
		});
	});
});
