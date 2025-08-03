import { IFilterClassificationRepository, FilterClassificationEntityModel, FilterClassificationEntity } from "@/domain/report";

describe("FilterClassificationEntity", () => {
	let mockRepository: IFilterClassificationRepository;
	let filterClassificationEntity: FilterClassificationEntity;
	const mockEntityModel = FilterClassificationEntityModel.create({
		filterClassificationId: 1,
		classification: "Classification",
		createdBy: 1,
		active: true
	});

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		filterClassificationEntity = new FilterClassificationEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			const result = filterClassificationEntity.create({
				classification: "",
				createdBy: -1,
				active: true,
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should create filter classification", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterClassificationEntityModel));

			const result = await filterClassificationEntity.create({
				classification: "Classification",
				createdBy: 1,
				active: true,
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should get null", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(null));

			const result = await filterClassificationEntity.getById(999);

			expect(result).toBeNull();
		});

		it("should get by id", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterClassificationEntityModel));

			const result = await filterClassificationEntity.getById(1);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getAll", () => {
		it("should get all filter classifications", async () => {
			jest.spyOn(mockRepository, "getAll").mockReturnValueOnce(Promise.resolve([mockEntityModel as FilterClassificationEntityModel]));

			const result = await filterClassificationEntity.getAll();

			expect(result).toEqual([mockEntityModel]);
		});
	});

	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			const result = filterClassificationEntity.update({
				filterClassificationId: -1,
				classification: "",
				createdBy: -1,
				active: true
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing filter classification", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			const result = filterClassificationEntity.update({
				filterClassificationId: 1,
				classification: "Classification",
				createdBy: 1,
				active: true
			});

			expect(result).rejects.toThrow(Error);
		});

		it("should update filter classification", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterClassificationEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterClassificationEntityModel));

			const result = await filterClassificationEntity.update({
				filterClassificationId: 1,
				classification: "Classification",
				createdBy: 1,
				active: true
			});

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid filter classification id", async () => {
			const result = filterClassificationEntity.delete(0);

			expect(result).rejects.toThrow(Error);
		});

		it("should return Error for a non-existing filter classification", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			const result = filterClassificationEntity.delete(1);

			expect(result).rejects.toThrow(Error);
		});

		it("should delete filter classification", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterClassificationEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as FilterClassificationEntityModel));

			const result = await filterClassificationEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
