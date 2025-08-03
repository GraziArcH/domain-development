import { IFilterRepository, FilterEntityModel, FilterEntity } from "@/domain/report";

describe("FilterEntity", () => {
	let mockRepository: IFilterRepository;
	let filterEntity: FilterEntity;
	const mockEntityModel = FilterEntityModel.create({
		filterId: 1,
		parentId: 1,
		createdAt: 1,
		description: "Desc",
		value: "Value",
		createdBy: 1,
		filterClassificationId: 1,
		filterValueTypeId: 1,
		order: 1,
		active: true,
		filterActionId: 1
	});

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getByParentId: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			getBySpotTemplateId: jest.fn(),
			getFiltersByReportTemplateId: jest.fn(),
			getBySpotTemplateIdWithYourDependents: jest.fn()
		};

		filterEntity = new FilterEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			const result = filterEntity.create({
				parentId: -1,
				description: "",
				value: "",
				createdBy: -1,
				filterClassificationId: -1,
				filterValueTypeId: -1,
				order: -1,
				active: true,
				filterActionId: -1,
				createdAt: -1
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should create filter", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterEntityModel));

			const result = await filterEntity.create({
				parentId: 1,
				createdAt: 1,
				description: "Desc",
				value: "Value",
				createdBy: 1,
				filterClassificationId: 1,
				filterValueTypeId: 1,
				order: 1,
				active: true,
				filterActionId: 1
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should get null", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(null));

			const result = await filterEntity.getById(999);

			expect(result).toBeNull();
		});

		it("should get by id", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterEntityModel));

			const result = await filterEntity.getById(1);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getAll", () => {
		it("should get all filters", async () => {
			jest.spyOn(mockRepository, "getAll").mockReturnValueOnce(Promise.resolve([mockEntityModel as FilterEntityModel]));

			const result = await filterEntity.getAll();

			expect(result).toEqual([mockEntityModel]);
		});
	});

	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			const result = filterEntity.update({
				filterId: -1,
				parentId: -1,
				description: "",
				value: "",
				createdBy: -1,
				filterClassificationId: -1,
				filterValueTypeId: -1,
				order: -1,
				active: true,
				filterActionId: -1,
				createdAt: -1
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing filter", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			const result = filterEntity.update({
				filterId: 1,
				parentId: 1,
				createdAt: 1,
				description: "Desc",
				value: "Value",
				createdBy: 1,
				filterClassificationId: 1,
				filterValueTypeId: 1,
				order: 1,
				active: true,
				filterActionId: 1
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should update filter", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterEntityModel));

			const result = await filterEntity.update({
				filterId: 1,
				parentId: 1,
				description: "Desc",
				value: "Value",
				createdBy: 1,
				filterClassificationId: 1,
				filterValueTypeId: 1,
				order: 1,
				active: true,
				filterActionId: 1,
				createdAt: 1
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid filter id", async () => {
			const result = filterEntity.delete(0);

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing filter", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			const result = filterEntity.delete(1);

			expect(result).rejects.toThrow(Error);
		});

		it("should delete filter", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterEntityModel));

			const result = await filterEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
