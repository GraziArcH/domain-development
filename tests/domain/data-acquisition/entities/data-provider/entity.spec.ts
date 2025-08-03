import {
	IDataProviderRepository,
	DataProviderEntityModel,
	DataProviderDTO,
	DataProviderEntity,
	DataProviderDTOWithoutId,
} from "@/domain/data-acquisition";

describe("DataProviderEntity", () => {
	let mockRepository: IDataProviderRepository;
	let dataProviderEntity: DataProviderEntity;
	const mockEntityModel = DataProviderEntityModel.create({
		dataProvidersId: 1,
		providerName: "DataProvider",
		providerDescription: "Data Provider Description",
	} as DataProviderDTO) as DataProviderEntityModel;

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			getById: jest.fn(),
		};

		dataProviderEntity = new DataProviderEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await dataProviderEntity.create({
				providerName: "",
				providerDescription: "",
			} as DataProviderDTOWithoutId).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create data provider", async () => {
			jest.spyOn(mockRepository, "create").mockResolvedValueOnce(mockEntityModel as DataProviderEntityModel);

			const result = await dataProviderEntity.create({
				providerName: "DataProvider",
				providerDescription: "Data Provider Description",
			} as DataProviderDTOWithoutId);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getAll", () => {
		it("should return all data providers", async () => {
			jest.spyOn(mockRepository, "getAll").mockResolvedValueOnce([mockEntityModel]);

			const result = await dataProviderEntity.getAll();

			expect(result).toEqual([mockEntityModel]);
		});
	});

	describe("update", () => {
		it("should update data provider", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "update").mockResolvedValueOnce(mockEntityModel);

			const result = await dataProviderEntity.update({
				dataProvidersId: 1,
				providerName: "DataProvider",
				providerDescription: "Data Provider Description",
			} as DataProviderDTO);

			expect(result).toEqual(mockEntityModel);
		});

		it("should return Error if data provider does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await dataProviderEntity.update({
				dataProvidersId: 1,
				providerName: "DataProvider",
				providerDescription: "Data Provider Description",
			} as DataProviderDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});

	describe("delete", () => {
		it("should delete data provider", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(mockEntityModel);

			const result = await dataProviderEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});

		it("should return Error if data provider does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await dataProviderEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});
});
