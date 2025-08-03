import { ReportTypeEntityModel } from "@/domain/report";
import { ReportTypeDTO } from "@/domain/report";

describe("ReportTypeEntityModel", () => {
	it("should return an error if reportTypeId is invalid", () => {
		const invalidReportTypeId = -1;
		const validTypeName = "Test Type";
		const validDescription = "Test Description";
		const validIcon = "Icon";
		const validActive = true
		const validCreatedBy = 1

		expect(() => ReportTypeEntityModel.create({
			reportTypeId: invalidReportTypeId,
			typeName: validTypeName,
			description: validDescription,
			icon: validIcon,
			active: validActive,
			createdBy: validCreatedBy
		} as ReportTypeDTO)).toThrow();
	});

	it("should return an error if typeName is invalid", () => {
		const validReportTypeId = 1;
		const invalidTypeName = "";
		const validDescription = "Test Description";
		const validIcon = "Icon";
		const validActive = true
		const validCreatedBy = 1

		expect(() => ReportTypeEntityModel.create({
			reportTypeId: validReportTypeId,
			typeName: invalidTypeName,
			description: validDescription,
			icon: validIcon,
			active: validActive,
			createdBy: validCreatedBy
		} as ReportTypeDTO)).toThrow();
	});

	it("should return an error if description is invalid", () => {
		const validReportTypeId = 1;
		const validTypeName = "Test Type";
		const invalidDescription = ""; 
		const validIcon = "Icon";
		const validActive = true
		const validCreatedBy = 1

		expect(() => ReportTypeEntityModel.create({
			reportTypeId: validReportTypeId,
			typeName: validTypeName,
			description: invalidDescription,
			icon: validIcon,
			active: validActive,
			createdBy: validCreatedBy
		} as ReportTypeDTO)).toThrow();
	});

	it("should return an error if icon is invalid", () => {
		const validReportTypeId = 1;
		const validTypeName = "Test Type";
		const validDescription = "Test Description";
		const invalidIcon = "";
		const validActive = true
		const validCreatedBy = 1
		
		expect(() => ReportTypeEntityModel.create({
			reportTypeId: validReportTypeId,
			typeName: validTypeName,
			description: validDescription,
			icon: invalidIcon,
			active: validActive,
			createdBy: validCreatedBy
		} as ReportTypeDTO)).toThrow();
	});

	it("should create a ReportTypeEntityModel instance with valid values", () => {
		const validReportTypeId = 1;
		const validTypeName = "Test Type";
		const validDescription = "Test Description";
		const validIcon = "Icon";
		const validActive = true
		const validCreatedBy = 1

		const result = ReportTypeEntityModel.create({
			reportTypeId: validReportTypeId,
			typeName: validTypeName,
			description: validDescription,
			icon: validIcon,
			active: validActive,
			createdBy: validCreatedBy
		} as ReportTypeDTO);

		expect(result).toBeInstanceOf(ReportTypeEntityModel);
	});
});
