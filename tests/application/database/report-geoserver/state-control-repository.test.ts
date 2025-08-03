import { DatabaseHelper, MockReportGeoserverRepository, StateControlRepository } from "@/application/framework";
import { StateControlEntityModel } from "@/domain/report-geoserver";
import { StringValueObject } from "@/domain/shared";

describe("StateControlRepository", () => {
	const databaseHelper = new DatabaseHelper("report-geoserver");
	const stateControlRepository = new StateControlRepository(databaseHelper);
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
		it("should create a new state control entry", async () => {
			const stateControl = StateControlEntityModel.create({
				id: "9944a1c8-26d3-4c08-bcf8-9211566ba65e",
				workspaceStatus: "ready",
				storeStatus: "ready",
				layerStatus: "ready",
				stack: "test stack"
			}) as StateControlEntityModel;

			const result = await stateControlRepository.create(stateControl);

			expect(result).toBeInstanceOf(StateControlEntityModel);
		});
	});

	describe("getById", () => {
		it("should get state control by ID", async () => {
			const stateControlId = StringValueObject.create("9ffee66b-3443-443b-a232-360d711a9036") as StringValueObject;

			const result = await stateControlRepository.getById(stateControlId);

			expect(result).toBeInstanceOf(StateControlEntityModel);
		});

		it("should return null if state control does not exist", async () => {
			const stateControlId = StringValueObject.create("9944a1c8-26d3-4c08-bcf8-9211566ba65a") as StringValueObject;

			const result = await stateControlRepository.getById(stateControlId);

			expect(result).toBeNull();
		});
	});

	describe("getAll", () => {
		it("should get all state controls", async () => {
			const result = await stateControlRepository.getAll();

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof StateControlEntityModel)).toBeTruthy();
		});
	});

	describe("update", () => {
		it("should update an existing state control", async () => {
			const stateControl = StateControlEntityModel.create({
				id: "81f3ae8c-f92e-4415-a093-c44728083921",
				workspaceStatus: "updated",
				storeStatus: "updated",
				layerStatus: "updated",
				stack: "updated stack"
			}) as StateControlEntityModel;

			const result = await stateControlRepository.update(stateControl);

			expect(result).toBeInstanceOf(StateControlEntityModel);
			expect(result.workspaceStatus.value).toEqual("updated");
		});
	});

	describe("delete", () => {
		it("should delete state control", async () => {
			const stateControlId = StringValueObject.create("9ffee66b-3443-443b-a232-360d711a9036") as StringValueObject;

			const result = await stateControlRepository.delete(stateControlId);

			expect(result).toBeInstanceOf(StateControlEntityModel);
		});
	});
});
