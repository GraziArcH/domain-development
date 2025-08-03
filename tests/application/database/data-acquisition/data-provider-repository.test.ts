import { DatabaseHelper, MockDataProvidersRepository, DataProviderRepository } from "@/application/framework";
import { DataProviderEntityModel } from "@/domain/data-acquisition";
import { IdValueObject } from "@/domain/shared";

describe("DataProviderRepository", () => {
	const databaseHelper = new DatabaseHelper("data");
	const mockDataProvidersRepository = new MockDataProvidersRepository(databaseHelper);

	beforeEach(async () => {
		await databaseHelper.connect();
		mockDataProvidersRepository.createMocks();
	});

	afterEach(async () => {
		await mockDataProvidersRepository.clearTables();
		await databaseHelper.disconnect();
	});

	describe("create", () => {
		it("should create a new data provider", async () => {
			const dataProviderRepository = new DataProviderRepository(databaseHelper);
			const dataProvider = DataProviderEntityModel.create(
				{
					dataProvidersId: 1, 
					providerName: "Provider A", 
					providerDescription: "Description A"
				}
			) as DataProviderEntityModel;
	
			const result = await dataProviderRepository.create(dataProvider);
	
			expect(result).toBeInstanceOf(DataProviderEntityModel);
		});
	});

	describe("getById", () => {
		it("should get null", async () => {
			const dataProviderRepository = new DataProviderRepository(databaseHelper);
			const dataProvidersId = IdValueObject.create(999) as IdValueObject;
	
			const result = await dataProviderRepository.getById(dataProvidersId);
	
			expect(result).toBeNull();
		});
	
		it("should get data provider by ID", async () => {
			const dataProviderRepository = new DataProviderRepository(databaseHelper);
			const dataProvidersId = IdValueObject.create(1) as IdValueObject;
	
			const result = await dataProviderRepository.getById(dataProvidersId);
	
			expect(result).toBeInstanceOf(DataProviderEntityModel);
		});
	});

	describe("getAll", () => {
		it("should get all data providers", async () => {
			const dataProviderRepository = new DataProviderRepository(databaseHelper);
	
			const result = await dataProviderRepository.getAll();
	
			expect(result).toBeInstanceOf(Array);
		});
	});

	describe("update", () => {
		it("should update data provider", async () => {
			const dataProviderRepository = new DataProviderRepository(databaseHelper);
			const updatedDataProvider = DataProviderEntityModel.create(
				{
					dataProvidersId: 1, 
					providerName: "Provider A", 
					providerDescription: "Description A"
				}
			) as DataProviderEntityModel;
	
			const result = await dataProviderRepository.update(updatedDataProvider);
	
			expect(result).toBeInstanceOf(DataProviderEntityModel);
		});
	});

	describe("delete", () => {
		it("should delete data provider", async () => {
			const dataProviderRepository = new DataProviderRepository(databaseHelper);
			const dataProvidersId = IdValueObject.create(1) as IdValueObject;
	
			const result = await dataProviderRepository.delete(dataProvidersId);
	
			expect(result).toBeInstanceOf(DataProviderEntityModel);
		});
	});
});