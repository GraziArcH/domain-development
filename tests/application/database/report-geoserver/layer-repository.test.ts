import { DatabaseHelper, LayerRepository, MockReportGeoserverRepository } from "@/application/framework";
import { LayerEntityModel, LayerNameValueObject } from "@/domain/report-geoserver";
import { IdValueObject } from "@/domain/shared";

describe("LayerRepository", () => {
	const databaseHelper = new DatabaseHelper("report-geoserver");
	const layerRepository = new LayerRepository(databaseHelper);
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
		it("should create a new layer", async () => {
			const layer = LayerEntityModel.create({
				id: 1,
				idStore: 1,
				idWorkspace: 1,
				name: "Layer Name",
				type: "Vector",
				filePath: "/path/to/file",
				fileKey: "key",
				geoserverResponseCode: 200,
				status: true,
				persistedInStoreAt: new Date(),
				sendToGeoserverAt: new Date()
			}) as LayerEntityModel;

			const result = await layerRepository.create(layer);

			expect(result).toBeInstanceOf(LayerEntityModel);
		});
	});

	describe("getById", () => {
		it("should get layer by ID", async () => {
			const layerId = IdValueObject.create(1) as IdValueObject;

			const result = await layerRepository.getById(layerId);

			expect(result).toBeInstanceOf(LayerEntityModel);
		});

		it("should return null if layer does not exist", async () => {
			const layerId = IdValueObject.create(9999) as IdValueObject;

			const result = await layerRepository.getById(layerId);

			expect(result).toBeNull();
		});
	});

	describe("getByName", () => {
		it("should get layer by name", async () => {
			const layerName = LayerNameValueObject.create("Layer 1") as LayerNameValueObject;

			const result = await layerRepository.getByName(layerName);

			expect(result).toBeInstanceOf(LayerEntityModel);
		});

		it("should return null if layer does not exist", async () => {
			const layerName = LayerNameValueObject.create("not found") as LayerNameValueObject;

			const result = await layerRepository.getByName(layerName);

			expect(result).toBeNull();
		});
	});

	describe("getAll", () => {
		it("should get all layers", async () => {
			const result = await layerRepository.getAll();

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof LayerEntityModel)).toBeTruthy();
		});
	});

	describe("update", () => {
		it("should update an existing layer", async () => {
			const layer = LayerEntityModel.create({
				id: 1,
				idStore: 1,
				idWorkspace: 1,
				name: "Updated Layer Name",
				type: "Vector",
				filePath: "/path/to/file",
				fileKey: "key",
				geoserverResponseCode: 200,
				status: true,
				persistedInStoreAt: new Date(),
				sendToGeoserverAt: new Date()
			}) as LayerEntityModel;

			const result = await layerRepository.update(layer);

			expect(result).toBeInstanceOf(LayerEntityModel);
			expect(result.name.value).toEqual("Updated Layer Name");
		});
	});

	describe("delete", () => {
		it("should delete layer", async () => {
			const layerId = IdValueObject.create(1) as IdValueObject;

			const result = await layerRepository.delete(layerId);

			expect(result).toBeInstanceOf(LayerEntityModel);
		});
	});
});
