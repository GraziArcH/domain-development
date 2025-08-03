import { DatabaseHelper, MockDataProvidersRepository, DataQualityInformationsRepository } from "@/application/framework";
import { DataQualityInformationsEntityModel } from "@/domain/automation";
import { IdValueObject } from "@/domain/shared";

describe("DataQualityInformationsRepository", () => {
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
		it("should create a new data quality information", async () => {
			const dataQualityInformationsRepository = new DataQualityInformationsRepository(databaseHelper);
			const dataQuality = DataQualityInformationsEntityModel.create(
				{
					qualityInformationsId: 1,
					dataProvidersId: 1,
					disturbancesDescription: "Description",
					identifiedAt: new Date(),
					timeOfDelay: new Date(),
					wasDelay: true
				}
			) as DataQualityInformationsEntityModel;
	
			const result = await dataQualityInformationsRepository.create(dataQuality);
	
			expect(result).toBeInstanceOf(DataQualityInformationsEntityModel);
		});
	});

	describe("getById", () => {
		it("should get null", async () => {
			const dataQualityInformationsRepository = new DataQualityInformationsRepository(databaseHelper);
			const dataQualityId = IdValueObject.create(999) as IdValueObject;
	
			const result = await dataQualityInformationsRepository.getById(dataQualityId);
	
			expect(result).toBeNull();
		});
	
		it("should get data quality information by ID", async () => {
			const dataQualityInformationsRepository = new DataQualityInformationsRepository(databaseHelper);
			const dataQualityId = IdValueObject.create(1) as IdValueObject;
	
			const result = await dataQualityInformationsRepository.getById(dataQualityId);
	
			expect(result).toBeInstanceOf(DataQualityInformationsEntityModel);
		});
	});

	describe("getAll", () => {
		it("should get all data quality informations", async () => {
			const dataQualityInformationsRepository = new DataQualityInformationsRepository(databaseHelper);
	
			const result = await dataQualityInformationsRepository.getAll();
	
			expect(result).toBeInstanceOf(Array);
		});
	
	});

	describe("update", () => {
		it("should update data quality information", async () => {
			const dataQualityInformationsRepository = new DataQualityInformationsRepository(databaseHelper);
			const updatedDataQuality = DataQualityInformationsEntityModel.create(
				{
					qualityInformationsId: 1,
					dataProvidersId: 1,
					disturbancesDescription: "Description",
					identifiedAt: new Date(),
					timeOfDelay: new Date(),
					wasDelay: true
				}
			) as DataQualityInformationsEntityModel;
	
			const result = await dataQualityInformationsRepository.update(updatedDataQuality);
	
			expect(result).toBeInstanceOf(DataQualityInformationsEntityModel);
		});
	});

	describe("delete", () => {
		it("should delete data quality information", async () => {
			const dataQualityInformationsRepository = new DataQualityInformationsRepository(databaseHelper);
			const dataQualityId = IdValueObject.create(1) as IdValueObject;
	
			const result = await dataQualityInformationsRepository.delete(dataQualityId);
	
			expect(result).toBeInstanceOf(DataQualityInformationsEntityModel);
		});
	});
});