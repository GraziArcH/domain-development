import {
	IReportTypeRepository,
	ReportTypeEntityModel,
	ReportTypeDTO,
	ReportTypeEntity,
	ReportTypeDTOWithoutId,
} from "@/domain/report";

describe("ReportTypeEntity", () => {
	let mockRepository: IReportTypeRepository;
	let reportTypeEntity: ReportTypeEntity;
	const mockEntityModel = ReportTypeEntityModel.create({
		reportTypeId: 1,
		typeName: "Test Type",
		description: "Test Description",
		icon: "Icon",
		active: true,
		createdBy: 1
	} as ReportTypeDTO);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		};

		reportTypeEntity = new ReportTypeEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await reportTypeEntity.create({
				typeName: "",
				description: "Test Description",
				icon: "Icon",
				active: true,
				createdBy: -1
			} as ReportTypeDTOWithoutId).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should create report type", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTypeEntityModel));

			const result = await reportTypeEntity.create({
				typeName: "Test Type",
				description: "Test Description",
				icon: "Icon",
				active: true,
				createdBy: 1
			} as ReportTypeDTOWithoutId);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should return Error for an invalid report type id", async () => {
			await reportTypeEntity.getById(0).catch(e => expect(e).toBeInstanceOf(Error));
		});
	});

	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			await reportTypeEntity.update({
				reportTypeId: -1,
				typeName: "Test Type",
				description: "Test Description",
				icon: "Icon",
				active: true,
				createdBy: 1
			} as ReportTypeDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should return Error for a non-existing report type", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			await reportTypeEntity.update({
				reportTypeId: 1,
				typeName: "Test Type",
				description: "Test Description",
				icon: "Icon",
				active: true,
				createdBy: 1
			} as ReportTypeDTO).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should update report type", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTypeEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTypeEntityModel));

			const result = await reportTypeEntity.update({
				reportTypeId: 1,
				typeName: "Test Type",
				description: "Test Description",
				icon: "Icon",
				active: true,
				createdBy: 1
			} as ReportTypeDTO);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid report type id", async () => {
			await reportTypeEntity.delete(0).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should return Error for a non-existing report type", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);

			await reportTypeEntity.delete(1).catch(e => expect(e).toBeInstanceOf(Error));
		});

		it("should delete report type", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTypeEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTypeEntityModel));

			const result = await reportTypeEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});
