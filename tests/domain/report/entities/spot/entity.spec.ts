import { ISpotDataRepository, ISpotRepository, SpotEntity, SpotEntityModel } from "@/domain/report";

describe("SpotEntity", () => {
	let mockRepositorySpot: ISpotRepository;
	let mockRepositorySpotData: ISpotDataRepository;
	let spotEntity: SpotEntity;
	const mockEntityModel = SpotEntityModel.create(
		{
			spotId: "1",
			spotTemplateId: "SpotTemplateId",
			spotData: "SpotData",
			filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
			spotName: "Name"
		}
	);

	beforeEach(() => {
		mockRepositorySpot = {
			create: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		mockRepositorySpotData = {
			create: jest.fn(),
			getById: jest.fn(),
			getBySpotDataName: jest.fn(),
			getBySpotTemplateIdAndFilters: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		};

		spotEntity = new SpotEntity(mockRepositorySpot, mockRepositorySpotData);
	});

	describe("createInCache", () => {
		it("should throw an error for an invalid spot entity model", async () => {
			spotEntity.createInCache({
				spotId: "",
				spotTemplateId: "",
				spotData: "",
				filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
				spotName: ""
			}).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create spot entity", async () => {
			jest.spyOn(mockRepositorySpot, "create").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.createInCache({
				spotId: "1",
				spotTemplateId: "SpotTemplateId",
				spotData: "SpotData",
				filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
				spotName: "Name"
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getCacheById", () => {
		it("should throw an error because id is invalid", async () => {
			await spotEntity.getCacheById("", {
				primaryFilters: [],
				secondaryFilters: [],
				specificFilters: []
			}).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should get spot by id", async () => {
			jest.spyOn(mockRepositorySpot, "getById").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.getCacheById("1", {
				primaryFilters: [],
				secondaryFilters: [],
				specificFilters: []
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("updateCache", () => {
		it("should throw an error for an invalid spot entity model", async () => {
			await spotEntity.updateCache({
				spotId: "",
				spotTemplateId: "",
				spotData: "",
				filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
				spotName: ""
			}).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should update spot entity", async () => {
			jest.spyOn(mockRepositorySpot, "update").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.updateCache({
				spotId: "1",
				spotTemplateId: "SpotTemplateId",
				spotData: "SpotData",
				filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
				spotName: "Name"
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("deleteCache", () => {
		it("should throw an error because id is invalid", async () => {
			await spotEntity.deleteCache("", {
				primaryFilters: [],
				secondaryFilters: [],
				specificFilters: []
			}).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should delete spot", async () => {
			jest.spyOn(mockRepositorySpot, "delete").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.deleteCache("1", {
				primaryFilters: [],
				secondaryFilters: [],
				specificFilters: []
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("createInNoSQL", () => {
		it("should throw an error for an invalid spot entity model", async () => {
			await spotEntity.createInNoSQL({
				spotTemplateId: "",
				spotData: "",
				filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
				spotName: ""
			}).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create spot entity", async () => {
			jest.spyOn(mockRepositorySpotData, "create").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.createInNoSQL({
				spotTemplateId: "SpotTemplateId",
				spotData: "SpotData",
				filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
				spotName: "Name"
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getNoSQLBySpotName", () => {
		it("should throw an error because id is invalid", async () => {
			await spotEntity.getNoSQLBySpotName("", { primaryFilters: [], secondaryFilters: [], specificFilters: [] }).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should get spot by spotName", async () => {
			jest.spyOn(mockRepositorySpotData, "getBySpotDataName").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.getNoSQLBySpotName("1", { primaryFilters: [], secondaryFilters: [], specificFilters: [] });

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getNoSQLById", () => {
		it("should throw an error because id is invalid", async () => {
			await spotEntity.getNoSQLById("").catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should get spot by id", async () => {
			jest.spyOn(mockRepositorySpotData, "getById").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.getNoSQLById("1");

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("updateNoSQL", () => {
		it("should throw an error for an invalid spot entity model", async () => {
			await spotEntity.updateNoSQL({
				spotId: "1",
				spotTemplateId: "SpotTemplateId",
				spotData: "SpotData",
				filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
				spotName: "Name"
			}).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should update spot entity", async () => {
			jest.spyOn(mockRepositorySpotData, "update").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.updateNoSQL({
				spotId: "1",
				spotTemplateId: "SpotTemplateId",
				spotData: "SpotData",
				filters: { primaryFilters: [], secondaryFilters: [], specificFilters: [] },
				spotName: "Name"
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("deleteNoSQL", () => {
		it("should throw an error because id is invalid", async () => {
			await spotEntity.deleteNoSQL("").catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should delete spot", async () => {
			jest.spyOn(mockRepositorySpotData, "delete").mockReturnValueOnce(
				Promise.resolve(mockEntityModel as SpotEntityModel)
			);

			const result = await spotEntity.deleteNoSQL("1");

			expect(result).toEqual(mockEntityModel);
		});
	});
});
