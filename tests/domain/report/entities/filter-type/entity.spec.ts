import { IFilterValueTypeRepository, FilterValueTypeEntityModel, FilterValueTypeEntity } from "@/domain/report";

describe("FilterValueTypeEntity", () => {
	let mockRepository: IFilterValueTypeRepository;
	let filterValueTypeEntity: FilterValueTypeEntity;
	const mockEntityModel = FilterValueTypeEntityModel.create({
		filterValueTypeId: 1,
		active: true,
		createdBy: 1,
		valueType: "Value"
	});

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		filterValueTypeEntity = new FilterValueTypeEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			const result = filterValueTypeEntity.create({
				active: true,
				createdBy: -1,
				valueType: ""
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should create filter type", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterValueTypeEntityModel));

			const result = await filterValueTypeEntity.create({
				active: true,
				createdBy: 1,
				valueType: "Value"
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should get null", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(null));

			const result = await filterValueTypeEntity.getById(999);

			expect(result).toBeNull();
		});

		it("should get by id", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterValueTypeEntityModel));

			const result = await filterValueTypeEntity.getById(1);

			expect(result).toEqual(mockEntityModel);
		});
	});


	describe("getAll", () => {
		it("should get all filter types", async () => {
			jest.spyOn(mockRepository, "getAll").mockReturnValueOnce(Promise.resolve([mockEntityModel as FilterValueTypeEntityModel]));

			const result = await filterValueTypeEntity.getAll();

			expect(result).toEqual([mockEntityModel]);
		});
	});

	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			const result = filterValueTypeEntity.update({
				filterValueTypeId: -1,
				active: true,
				createdBy: -1,
				valueType: ""
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing filter type", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			const result = filterValueTypeEntity.update({
				filterValueTypeId: 1,
				active: true,
				createdBy: 1,
				valueType: "Value"
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should update filter type", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterValueTypeEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterValueTypeEntityModel));

			const result = await filterValueTypeEntity.update({
				filterValueTypeId: 1,
				active: true,
				createdBy: 1,
				valueType: "Value"
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid filter type id", async () => {
			const result = filterValueTypeEntity.delete(0);

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing filter type", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			const result = filterValueTypeEntity.delete(1);

			expect(result).rejects.toThrow(Error);
		});

		it("should delete filter type", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterValueTypeEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterValueTypeEntityModel));

			const result = await filterValueTypeEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
