import {
	IStoreLayerRepository,
	StoreLayerEntityModel,
	StoreLayerDTO,
	StoreLayerEntity,
	StoreLayerWithoutDTO,
} from "@/domain/report-geoserver";

describe("StoreLayerEntity", () => {
	let mockRepository: IStoreLayerRepository;
	let storeLayerEntity: StoreLayerEntity;
	const mockEntityModel = StoreLayerEntityModel.create({
		id: 1,
		idWorkspace: 1,
		name: "Test Store Layer",
		description: "Test Description",
		type: "Test Type",
		endpoint: "http://example.com",
		createdBy: 1
	} as StoreLayerDTO);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getByName: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		storeLayerEntity = new StoreLayerEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await storeLayerEntity.create({
				idWorkspace: 1,
				name: "",
				description: "Test Description",
				type: "Test Type",
				endpoint: "http://example.com",
				createdBy: 1
			} as StoreLayerWithoutDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create store layer", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as StoreLayerEntityModel));

			const result = await storeLayerEntity.create({
				idWorkspace: 1,
				name: "Test Store Layer",
				description: "Test Description",
				type: "Test Type",
				endpoint: "http://example.com",
				createdBy: 1
			} as StoreLayerWithoutDTO);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should return Error for an invalid store layer id", async () => {
			await storeLayerEntity.getById(0).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});

	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			await storeLayerEntity.update({
				id: -1,
				idWorkspace: 1,
				name: "Test Store Layer",
				description: "Test Description",
				type: "Test Type",
				endpoint: "http://example.com",
				createdBy: 1
			} as StoreLayerDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should return Error for a non-existing store layer", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			await storeLayerEntity.update({
				id: 1,
				idWorkspace: 1,
				name: "Test Store Layer",
				description: "Test Description",
				type: "Test Type",
				endpoint: "http://example.com",
				createdBy: 1
			} as StoreLayerDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should update store layer", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as StoreLayerEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as StoreLayerEntityModel));

			const result = await storeLayerEntity.update({
				id: 1,
				idWorkspace: 1,
				name: "Test Store Layer",
				description: "Test Description",
				type: "Test Type",
				endpoint: "http://example.com",
				createdBy: 1
			} as StoreLayerDTO);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid store layer id", async () => {
			await storeLayerEntity.delete(0).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should return Error for a non-existing store layer", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			await storeLayerEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should delete store layer", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as StoreLayerEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as StoreLayerEntityModel));

			const result = await storeLayerEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
