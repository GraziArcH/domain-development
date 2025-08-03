import {
	IReportTemplateRepository,
	ReportTemplateEntityModel,
	ReportTemplateDTO,
	ReportTemplateEntity,
	ReportTemplateDTOWithoutId,
} from "@/domain/report";

describe("ReportTemplateEntity", () => {
	let mockRepository: IReportTemplateRepository;
	let reportTemplateEntity: ReportTemplateEntity;
	const mockEntityModel = ReportTemplateEntityModel.create({
		reportTemplateId: 1,
		reportTypeId: 1,
		reportName: "Test Report",
		title: "Test Title",
		description: "Test Description",
		cachePurgePeriod: "1 day",
		version: "1.0",
		createdBy: 1,
		active: true,
		draft: true,
		formatting: {},
		path: "path",
		numberOfLines: 1
	} as ReportTemplateDTO);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getByReportTemplateName: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
			getByReportTypeId: jest.fn()
		};

		reportTemplateEntity = new ReportTemplateEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await expect(async () => {
				await reportTemplateEntity.create({
					reportTypeId: 1,
					reportName: "",
					title: "Test Title",
					description: "Test Description",
					numberOfLines: 5,
					cachePurgePeriod: "1 day",
					version: "1.0",
					createdBy: 1,
					active: true,
					draft: true,
					formatting: {},
					path: "path"
				} as ReportTemplateDTOWithoutId);
			}).rejects.toThrow(Error);
		});
	
		it("should create report template", async () => {
			jest.spyOn(mockRepository, "create").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTemplateEntityModel));
	
			const result = await reportTemplateEntity.create({
				reportTypeId: 1,
				reportName: "Test Report",
				title: "Test Title",
				description: "Test Description",
				numberOfLines: 5,
				cachePurgePeriod: "1 day",
				version: "1.0",
				createdBy: 1,
				active: true,
				draft: true,
				formatting: {},
				path: "path"
			} as ReportTemplateDTOWithoutId);
	
			expect(result).toEqual(mockEntityModel);
		});
	});
	
	describe("getById", () => {
		it("should return Error for an invalid report template id", async () => {
			await expect(reportTemplateEntity.getById(0)).rejects.toThrow(Error);
		});
	});
	
	describe("getByReportTemplateName", () => {
		it("should return Error for an invalid report template name", async () => {
			await expect(reportTemplateEntity.getByReportTemplateName("")).rejects.toThrow(Error);
		});
	});
	
	describe("update", () => {
		it("should return Error for an invalid entity model", async () => {
			await expect(reportTemplateEntity.update({
				reportTemplateId: -1,
				reportTypeId: 1,
				reportName: "Test Report",
				title: "Test Title",
				description: "Test Description",
				numberOfLines: 5,
				cachePurgePeriod: "1 day",
				version: "1.0",
				createdBy: 1,
				active: true,
				draft: true,
				formatting: {},
				path: "path"
			} as ReportTemplateDTO)).rejects.toThrow(Error);
		});
	
		it("should return Error for a non-existing report template", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);
	
			await expect(reportTemplateEntity.update({
				reportTemplateId: 1,
				reportTypeId: 1,
				reportName: "Test Report",
				title: "Test Title",
				description: "Test Description",
				numberOfLines: 5,
				cachePurgePeriod: "1 day",
				version: "1.0",
				createdBy: 1,
				active: true,
				draft: true,
				formatting: {},
				path: "/"
			} as ReportTemplateDTO)).rejects.toThrow(Error);
		});
	
		it("should update report template", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTemplateEntityModel));
			jest.spyOn(mockRepository, "update").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTemplateEntityModel));
	
			const result = await reportTemplateEntity.update({
				reportTemplateId: 1,
				reportTypeId: 1,
				reportName: "Test Report",
				title: "Test Title",
				description: "Test Description",
				numberOfLines: 5,
				cachePurgePeriod: "1 day",
				version: "1.0",
				createdBy: 1,
				active: true,
				draft: true,
				formatting: {},
				path: "path"
			} as ReportTemplateDTO);
	
			expect(result).toEqual(mockEntityModel);
		});
	});
	
	describe("delete", () => {
		it("should return Error for an invalid report template id", async () => {
			await expect(reportTemplateEntity.delete(0)).rejects.toThrow(Error);
		});
	
		it("should return Error for a non-existing report template", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(null);
	
			await expect(reportTemplateEntity.delete(1)).rejects.toThrow(Error);
		});
	
		it("should delete report template", async () => {
			jest.spyOn(mockRepository, "getById").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTemplateEntityModel));
			jest.spyOn(mockRepository, "delete").mockReturnValueOnce(Promise.resolve(mockEntityModel as ReportTemplateEntityModel));
	
			const result = await reportTemplateEntity.delete(1);
	
			expect(result).toEqual(mockEntityModel);
		});
	});
	
});
