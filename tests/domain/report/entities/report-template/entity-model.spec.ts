import { ReportTemplateEntityModel } from "@/domain/report";

describe("ReportTemplateEntityModel", () => {
	it("should return an error if reportTemplateId is invalid", () => {
		const invalidReportTemplateId = -1;
		const validReportName = "Valid Report";
		const validTitle = "Valid Title";
		const validDescription = "Valid Description";
		const validNumberOfLines = 10;
		const validCachePurgePeriod = "14d";
		const validVersion = "1.0.0";
		const validCreatedBy = 1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		expect(() => ReportTemplateEntityModel.create(
			{
				reportTemplateId: invalidReportTemplateId,
				reportName: validReportName,
				title: validTitle,
				description: validDescription,
				numberOfLines: validNumberOfLines,
				cachePurgePeriod: validCachePurgePeriod,
				version: validVersion,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		)).toThrow();
	});


	it("should return an error if reportName is invalid", () => {
		const validReportTemplateId = 1;
		const invalidReportName = "";
		const validTitle = "Valid Title";
		const validDescription = "Valid Description";
		const validNumberOfLines = 10;
		const validCachePurgePeriod = "14d";
		const validVersion = "1.0.0";
		const validCreatedBy = 1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		expect(() => ReportTemplateEntityModel.create(
			{
				reportTemplateId: validReportTemplateId,
				reportName: invalidReportName,
				title: validTitle,
				description: validDescription,
				numberOfLines: validNumberOfLines,
				cachePurgePeriod: validCachePurgePeriod,
				version: validVersion,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		)).toThrow();
	});

	it("should return an error if title is invalid", () => {
		const validReportTemplateId = 1;
		const validReportName = "Valid Report";
		const invalidTitle = "";
		const validDescription = "Valid Description";
		const validNumberOfLines = 10;
		const validCachePurgePeriod = "14d";
		const validVersion = "1.0.0";
		const validCreatedBy = 1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		expect(() => ReportTemplateEntityModel.create(
			{
				reportTemplateId: validReportTemplateId,
				reportName: validReportName,
				title: invalidTitle,
				description: validDescription,
				numberOfLines: validNumberOfLines,
				cachePurgePeriod: validCachePurgePeriod,
				version: validVersion,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		)).toThrow();
	});

	it("should return an error if description is invalid", () => {
		const validReportTemplateId = 1;
		const validReportName = "Valid Report";
		const validTitle = "Valid Title";
		const invalidDescription = "";
		const validNumberOfLines = 10;
		const validCachePurgePeriod = "14d";
		const validVersion = "1.0.0";
		const validCreatedBy = 1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		expect(() => ReportTemplateEntityModel.create(
			{
				reportTemplateId: validReportTemplateId,
				reportName: validReportName,
				title: validTitle,
				description: invalidDescription,
				numberOfLines: validNumberOfLines,
				cachePurgePeriod: validCachePurgePeriod,
				version: validVersion,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		)).toThrow();
	});

	it("should return an error if numberOfLines is invalid", () => {
		const validReportTemplateId = 1;
		const validReportName = "Valid Report";
		const validTitle = "Valid Title";
		const validDescription = "Valid Description";
		const invalidNumberOfLines = -10;
		const validCachePurgePeriod = "14d";
		const validVersion = "1.0.0";
		const validCreatedBy = 1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		expect(() => ReportTemplateEntityModel.create(
			{
				reportTemplateId: validReportTemplateId,
				reportName: validReportName,
				title: validTitle,
				description: validDescription,
				numberOfLines: invalidNumberOfLines,
				cachePurgePeriod: validCachePurgePeriod,
				version: validVersion,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		)).toThrow();
	});

	it("should return an error if cachePurgePeriod is invalid", () => {
		const validReportTemplateId = 1;
		const validReportName = "Valid Report";
		const validTitle = "Valid Title";
		const validDescription = "Valid Description";
		const validNumberOfLines = 10;
		const invalidCachePurgePeriod = "";
		const validVersion = "1.0.0";
		const validCreatedBy = 1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		expect(() => ReportTemplateEntityModel.create(
			{
				reportTemplateId: validReportTemplateId,
				reportName: validReportName,
				title: validTitle,
				description: validDescription,
				numberOfLines: validNumberOfLines,
				cachePurgePeriod: invalidCachePurgePeriod,
				version: validVersion,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		)).toThrow();
	});

	it("should return an error if createdBy is invalid", () => {
		const validReportTemplateId = 1;
		const validReportName = "Valid Report";
		const validTitle = "Valid Title";
		const validDescription = "Valid Description";
		const validNumberOfLines = 10;
		const validCachePurgePeriod = "14d";
		const validVersion = "1.0.0";
		const invalidCreatedBy = -1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		expect(() => ReportTemplateEntityModel.create(
			{
				reportTemplateId: validReportTemplateId,
				reportName: validReportName,
				title: validTitle,
				description: validDescription,
				numberOfLines: validNumberOfLines,
				cachePurgePeriod: validCachePurgePeriod,
				version: validVersion,
				createdBy: invalidCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		)).toThrow();
	});

	it("should return an error if version is invalid", () => {
		const validReportTemplateId = 1;
		const validReportName = "Valid Report";
		const validTitle = "Valid Title";
		const validDescription = "Valid Description";
		const validNumberOfLines = 10;
		const validCachePurgePeriod = "14d";
		const invalidVersion = "1".repeat(100);
		const validCreatedBy = 1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		expect(() => ReportTemplateEntityModel.create(
			{
				reportTemplateId: validReportTemplateId,
				reportName: validReportName,
				title: validTitle,
				description: validDescription,
				numberOfLines: validNumberOfLines,
				cachePurgePeriod: validCachePurgePeriod,
				version: invalidVersion,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		)).toThrow();
	});

	it("should create a ReportTemplateEntityModel instance with valid values", () => {
		const validReportTemplateId = 1;
		const validReportName = "Valid Report";
		const validTitle = "Valid Title";
		const validDescription = "Valid Description";
		const validNumberOfLines = 10;
		const validCachePurgePeriod = "14d";
		const validVersion = "1.0.0";
		const validCreatedBy = 1;
		const validActive = true;
		const validDrat = true;
		const validFormatting = {};
		const validPath = "ValidValue";
		const validReportTypeId = 1;

		const sut = ReportTemplateEntityModel.create(
			{
				reportTemplateId: validReportTemplateId,
				reportName: validReportName,
				title: validTitle,
				description: validDescription,
				numberOfLines: validNumberOfLines,
				cachePurgePeriod: validCachePurgePeriod,
				version: validVersion,
				createdBy: validCreatedBy,
				active: validActive,
				draft: validDrat,
				formatting: validFormatting,
				path: validPath,
				reportTypeId: validReportTypeId
			}
		) as ReportTemplateEntityModel;

		expect(sut).toBeInstanceOf(ReportTemplateEntityModel);
		expect(sut.reportTemplateId.value).toBe(validReportTemplateId);
		expect(sut.reportName.value).toBe(validReportName);
		expect(sut.title.value).toBe(validTitle);
		expect(sut.description.value).toBe(validDescription);
		expect(sut.numberOfLines.value).toBe(validNumberOfLines);
		expect(sut.cachePurgePeriod.value).toBe(validCachePurgePeriod);
		expect(sut.createdBy.value).toBe(validCreatedBy);
		expect(sut.version.value).toBe(validVersion);
		expect(sut.active).toBe(validActive);
	});
});