import {
	IDataQualityInformationsRepository,
	DataQualityInformationsEntityModel,
	DataQualityInformationsDTO,
	DataQualityInformationsDTOWithoutId,
	DataQualityInformationsEntity,
} from "@/domain/automation";

describe("DataQualityInformationsEntity", () => {
	let mockRepository: IDataQualityInformationsRepository;
	let dataQualityInformationsEntity: DataQualityInformationsEntity;
	const mockEntityModel = DataQualityInformationsEntityModel.create({
		qualityInformationsId: 1,
		dataProvidersId: 1,
		disturbancesDescription: "Disturbance Description",
		identifiedAt: new Date(),
		timeOfDelay: new Date(),
		wasDelay: false,
	} as DataQualityInformationsDTO) as DataQualityInformationsEntityModel;

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			getById: jest.fn(),
		};

		dataQualityInformationsEntity = new DataQualityInformationsEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await dataQualityInformationsEntity.create({
				dataProvidersId: -1,
				disturbancesDescription: "",
				identifiedAt: new Date(),
				timeOfDelay: new Date(),
				wasDelay: false,
			} as DataQualityInformationsDTOWithoutId).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create data quality information", async () => {
			jest.spyOn(mockRepository, "create").mockResolvedValueOnce(mockEntityModel as DataQualityInformationsEntityModel);

			const result = await dataQualityInformationsEntity.create({
				dataProvidersId: 1,
				disturbancesDescription: "Disturbance Description",
				identifiedAt: new Date(),
				timeOfDelay: new Date(),
				wasDelay: false,
			} as DataQualityInformationsDTOWithoutId);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getAll", () => {
		it("should return all data quality informations", async () => {
			jest.spyOn(mockRepository, "getAll").mockResolvedValueOnce([mockEntityModel]);

			const result = await dataQualityInformationsEntity.getAll();

			expect(result).toEqual([mockEntityModel]);
		});
	});

	describe("update", () => {
		it("should update data quality information", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "update").mockResolvedValueOnce(mockEntityModel);

			const result = await dataQualityInformationsEntity.update({
				qualityInformationsId: 1,
				dataProvidersId: 1,
				disturbancesDescription: "Disturbance Description",
				identifiedAt: new Date(),
				timeOfDelay: new Date(),
				wasDelay: false,
			} as DataQualityInformationsDTO);

			expect(result).toEqual(mockEntityModel);
		});

		it("should return Error if data quality information does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await dataQualityInformationsEntity.update({
				qualityInformationsId: 1,
				dataProvidersId: 1,
				disturbancesDescription: "Disturbance Description",
				identifiedAt: new Date(),
				timeOfDelay: new Date(),
				wasDelay: false,
			} as DataQualityInformationsDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});

	describe("delete", () => {
		it("should delete data quality information", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(mockEntityModel);

			const result = await dataQualityInformationsEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});

		it("should return Error if data quality information does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await dataQualityInformationsEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});
});
