import {
	IWorkspaceRepository,
	WorkspaceEntityModel,
	WorkspaceDTO,
	WorkspaceEntity,
	WorkspaceWithoutIdDTO,
} from "@/domain/report-geoserver";

describe("WorkspaceEntity", () => {
	let mockRepository: IWorkspaceRepository;
	let workspaceEntity: WorkspaceEntity;
	const mockEntityModel = WorkspaceEntityModel.create({
		id: 1,
		name: "Test Workspace",
		description: "Test Description"
	} as WorkspaceDTO);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getByName: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		workspaceEntity = new WorkspaceEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await workspaceEntity.create({
				name: "",
				description: "Test Description"
			} as WorkspaceWithoutIdDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create workspace", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as WorkspaceEntityModel));

			const result = await workspaceEntity.create({
				name: "Test Workspace",
				description: "Test Description"
			} as WorkspaceWithoutIdDTO);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should return Error for an invalid workspace id", async () => {
			await workspaceEntity.getById(0).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});

	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			await workspaceEntity.update({
				id: -1,
				name: "Test Workspace",
				description: "Test Description"
			} as WorkspaceDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should return Error for a non-existing workspace", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			await workspaceEntity.update({
				id: 1,
				name: "Test Workspace",
				description: "Test Description"
			} as WorkspaceDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should update workspace", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as WorkspaceEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as WorkspaceEntityModel));

			const result = await workspaceEntity.update({
				id: 1,
				name: "Test Workspace",
				description: "Test Description"
			} as WorkspaceDTO);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid workspace id", async () => {
			await workspaceEntity.delete(0).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should return Error for a non-existing workspace", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			await workspaceEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should delete workspace", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as WorkspaceEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as WorkspaceEntityModel));

			const result = await workspaceEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
