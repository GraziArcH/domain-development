import { IFiltersBySpotRepository, FiltersBySpotEntity, FiltersBySpotEntityModel } from "@/domain/report";

describe("FiltersBySpotEntity", () => {
	let mockRepository: IFiltersBySpotRepository;
	let filtersBySpotEntity: FiltersBySpotEntity;
	const mockEntityModel = FiltersBySpotEntityModel.create({
		filterId: 1,
		filtersBySpotId: 1,
		createdBy: 1,
		spotTemplateId: 1,
		active: true
	});

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			removeFilterFromTemplate: jest.fn()
		};

		filtersBySpotEntity = new FiltersBySpotEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			const result = filtersBySpotEntity.create({
				filterId: -1,
				createdBy: -1,
				spotTemplateId: -1,
				active: true
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should create filters by spot", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as FiltersBySpotEntityModel));

			const result = await filtersBySpotEntity.create({
				filterId: 1,
				createdBy: 1,
				spotTemplateId: 1,
				active: true
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should get null", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(null));

			const result = await filtersBySpotEntity.getById(999);

			expect(result).toBeNull();
		});

		it("should get by id", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FiltersBySpotEntityModel));

			const result = await filtersBySpotEntity.getById(1);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getAll", () => {
		it("should get all filters by spot", async () => {
			jest.spyOn(mockRepository, "getAll").mockReturnValueOnce(Promise.resolve([mockEntityModel as FiltersBySpotEntityModel]));

			const result = await filtersBySpotEntity.getAll();

			expect(result).toEqual([mockEntityModel]);
		});
	});

	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			const result = filtersBySpotEntity.update({
				filtersBySpotId: -1,
				filterId: -1,
				createdBy: -1,
				spotTemplateId: -1,
				active: true
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for non-existing filters by spot", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			const result = filtersBySpotEntity.update({
				filtersBySpotId: 1,
				filterId: 1,
				createdBy: 1,
				spotTemplateId: 1,
				active: true
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should update filters by spot", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FiltersBySpotEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as FiltersBySpotEntityModel));

			const result = await filtersBySpotEntity.update({
				filtersBySpotId: 1,
				filterId: 1,
				createdBy: 1,
				spotTemplateId: 1,
				active: true
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid filters by spot id", async () => {
			const result = filtersBySpotEntity.delete(0);

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for non-existing filters by spot", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			const result = filtersBySpotEntity.delete(1);

			expect(result).rejects.toThrow(Error);
		});

		it("should delete filters by spot", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FiltersBySpotEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as FiltersBySpotEntityModel));

			const result = await filtersBySpotEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
