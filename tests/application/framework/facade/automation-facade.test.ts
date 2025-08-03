import { automationFacade, databaseHelperData, databaseHelperMethodology } from "@/application/factories";
import { MockDataProvidersRepository, MockMethodologyRepository } from "@/application/framework";
import {
	DataQualityInformationsEntityModel,
	MethodEntityModel,
} from "@/domain/automation";

describe("DataProviderRepository", () => {
	const mockMethodologyRepository = new MockMethodologyRepository(databaseHelperMethodology);
	const mockDataProvidersRepository = new MockDataProvidersRepository(databaseHelperData);

	beforeEach(async () => {
		await mockMethodologyRepository.createMocks();
		await mockDataProvidersRepository.createMocks();
	});

	afterEach(async () => {
		await mockMethodologyRepository.clearTables();
		await mockDataProvidersRepository.clearTables();
		await databaseHelperData.disconnect();
		await databaseHelperMethodology.disconnect();
	});
	
	describe("createMethod", () => {
		
		it("should create a new method", async () => {
			const onsMethodologyId = 1;
			const methodDescription = "Method A";
			const residue = "Residue A";
			const skill = "Skill A";
			const errorMeasurements = 5;

			const result = await automationFacade.createMethod(
				{
					onsMethodologyId,
					methodDescription,
					residue,
					skill,
					errorMeasurements
				}
			);

			expect(result).toBeInstanceOf(MethodEntityModel);
		});
	});

	describe("getMethods", () => {
		it("should get all methods", async () => {
			const result = await automationFacade.getMethods();
	
			expect(result).toBeInstanceOf(Array);
		});
	});

	describe("updateMethod", () => {
		it("should update a method", async () => {
			const methodId = 1;
			const onsMethodologyId = 1;
			const methodDescription = "Updated Method";
			const residue = "Updated Residue";
			const skill = "Updated Skill";
			const errorMeasurements = 10;
	
			const result = await automationFacade.updateMethod(
				{
					methodId,
					onsMethodologyId,
					methodDescription,
					residue,
					skill,
					errorMeasurements
				}
			);
	
			expect(result).toBeInstanceOf(MethodEntityModel);
		});
	
	});

	describe("deleteMethod", () => {
		it("should delete a method", async () => {
			const methodId = 1;

			const result = await automationFacade.deleteMethod(methodId);

			expect(result).toBeInstanceOf(MethodEntityModel);
		});
	});

	describe("createDataQualityInformations", () => {
		it("should create data quality information", async () => {
			const dataProvidersId = 1;
			const disturbancesDescription = "Disturbance A";
			const identifiedAt = new Date();
			const timeOfDelay = new Date();
			const wasDelay = true;
	
			const result = await automationFacade.createDataQualityInformations(
				{
					dataProvidersId,
					disturbancesDescription,
					identifiedAt,
					timeOfDelay,
					wasDelay
				}
			);
	
			expect(result).toBeInstanceOf(DataQualityInformationsEntityModel);
		});
	});

	describe("getDatasQualityInformations", () => {
		it("should get all data quality information", async () => {
			const result = await automationFacade.getDatasQualityInformations();

			expect(result).toBeInstanceOf(Array);
		});
	});

	describe("updateDataQualityInformations", () => {
		it("should update data quality information", async () => {
			const qualityInformationsId = 1;
			const dataProvidersId = 1;
			const disturbancesDescription = "Updated Disturbance";
			const identifiedAt = new Date();
			const timeOfDelay = new Date();
			const wasDelay = true;
	
			const result = await automationFacade.updateDataQualityInformations(
				{
					qualityInformationsId,
					dataProvidersId,
					disturbancesDescription,
					identifiedAt,
					timeOfDelay,
					wasDelay
				}
			);
	
			expect(result).toBeInstanceOf(DataQualityInformationsEntityModel);
		});
	});

	describe("deleteDataQualityInformations", () => {
		it("should delete data quality information", async () => {
			const qualityInformationsId = 1;
	
			const result = await automationFacade.deleteDataQualityInformations(qualityInformationsId);
	
			expect(result).toBeInstanceOf(DataQualityInformationsEntityModel);
		});
	});
});