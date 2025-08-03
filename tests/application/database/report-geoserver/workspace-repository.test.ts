import { DatabaseHelper, MockReportGeoserverRepository, WorkspaceRepository } from "@/application/framework";
import { WorkspaceEntityModel, WorkspaceNameValueObject } from "@/domain/report-geoserver";
import { IdValueObject } from "@/domain/shared";

describe("WorkspaceRepository", () => {
	const databaseHelper = new DatabaseHelper("report-geoserver");
	const workspaceRepository = new WorkspaceRepository(databaseHelper);
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
		it("should create a new workspace", async () => {
			const workspace = WorkspaceEntityModel.create({
				id: 1,
				name: "Workspace Name",
				description: "Description"
			}) as WorkspaceEntityModel;

			const result = await workspaceRepository.create(workspace);

			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});
	});

	describe("getById", () => {
		it("should get workspace by ID", async () => {
			const workspaceId = IdValueObject.create(1) as IdValueObject;

			const result = await workspaceRepository.getById(workspaceId);

			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});

		it("should return null if workspace does not exist", async () => {
			const workspaceId = IdValueObject.create(9999) as IdValueObject;

			const result = await workspaceRepository.getById(workspaceId);

			expect(result).toBeNull();
		});
	});

	describe("getByName", () => {
		it("should get workspace by name", async () => {
			const workspaceName = WorkspaceNameValueObject.create("Workspace A") as WorkspaceNameValueObject;

			const result = await workspaceRepository.getByName(workspaceName);

			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});

		it("should return null if workspace does not exist", async () => {
			const workspaceName = WorkspaceNameValueObject.create("Not Found") as WorkspaceNameValueObject;

			const result = await workspaceRepository.getByName(workspaceName);

			expect(result).toBeNull();
		});
	});

	describe("getAll", () => {
		it("should get all workspaces", async () => {
			const result = await workspaceRepository.getAll();

			expect(result).toBeInstanceOf(Array);
			expect(result.every((item) => item instanceof WorkspaceEntityModel)).toBeTruthy();
		});
	});

	describe("update", () => {
		it("should update an existing workspace", async () => {
			const workspace = WorkspaceEntityModel.create({
				id: 1,
				name: "Updated Workspace Name",
				description: "Description"
			}) as WorkspaceEntityModel;

			const result = await workspaceRepository.update(workspace);

			expect(result).toBeInstanceOf(WorkspaceEntityModel);
			expect(result.name.value).toEqual("Updated Workspace Name");
		});
	});

	describe("delete", () => {
		it("should delete workspace", async () => {
			const workspaceId = IdValueObject.create(1) as IdValueObject;

			const result = await workspaceRepository.delete(workspaceId);

			expect(result).toBeInstanceOf(WorkspaceEntityModel);
		});
	});
});
