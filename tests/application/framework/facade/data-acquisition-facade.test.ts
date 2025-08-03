import { dataAcquisitionFacade, databaseHelperData } from "@/application/factories";
import { MockDataProvidersRepository } from "@/application/framework";
import { DataProviderEntityModel } from "@/domain/data-acquisition";

describe("DataAcquisitionFacade", () => {
	const mockDataProvidersRepository = new MockDataProvidersRepository(databaseHelperData);

	beforeEach(async () => {
		await mockDataProvidersRepository.createMocks();
	});

	afterEach(async () => {
		await mockDataProvidersRepository.clearTables();
		await databaseHelperData.disconnect();
	});

	describe("createDataProvider", () => {
		it("should create a new data provider", async () => {
			const providerName = "Provider A";
			const providerDescription = "Description A";
	
			const result = await dataAcquisitionFacade.createDataProvider({
				providerName, 
				providerDescription
			});
	
			expect(result).toBeInstanceOf(DataProviderEntityModel);
		});
	});

	describe("getDataProviders", () => {
		it("should get all data providers", async () => {
			const result = await dataAcquisitionFacade.getDataProviders();
	
			expect(result).toBeInstanceOf(Array);
		});
	});

	describe("updateDataProvider", () => {
		it("should update data provider", async () => {
			const dataProvidersId = 1;
			const providerName = "Provider C";
			const providerDescription = "Description C";
	
			const result = await dataAcquisitionFacade.updateDataProvider({
				dataProvidersId, 
				providerName, 
				providerDescription
			});
	
			expect(result).toBeInstanceOf(DataProviderEntityModel);
		});
	});

	describe("deleteDataProvider", () => {
		it("should delete data provider", async () => {
			const dataProvidersId = 1;
	
			const result = await dataAcquisitionFacade.deleteDataProvider(dataProvidersId);
	
			expect(result).toBeInstanceOf(DataProviderEntityModel);
		});
	});
});