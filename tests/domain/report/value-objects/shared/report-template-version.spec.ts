import {
	InvalidReportTemplateVersionValueObjectError,
	ReportTemplateVersionValueObject,
} from "@/domain/report"; 

describe("ReportTemplateVersionValueObject", () => {
	it("should return InvalidReportTemplateVersionValueObjectError for an invalid report template version (null)", () => {
		const invalidReportTemplateVersion = null;

		expect(() => ReportTemplateVersionValueObject.create(invalidReportTemplateVersion)).toThrow(InvalidReportTemplateVersionValueObjectError);
	});

	it("should return InvalidReportTemplateVersionValueObjectError for an invalid report template version (number)", () => {
		const invalidReportTemplateVersion = 123;

		expect(() => ReportTemplateVersionValueObject.create(
			invalidReportTemplateVersion as unknown as string
		)).toThrow(InvalidReportTemplateVersionValueObjectError);
	});

	it("should return InvalidReportTemplateVersionValueObjectError for an invalid report template version (empty string)", () => {
		const invalidReportTemplateVersion = "";

		expect(() => ReportTemplateVersionValueObject.create(invalidReportTemplateVersion)).toThrow(InvalidReportTemplateVersionValueObjectError);
	});

	it("should return InvalidReportTemplateVersionValueObjectError for an invalid report template version (string with length > 11)", () => {
		const invalidReportTemplateVersion = "InvalidVersionWithLengthMoreThan11Characters";

		expect(() => ReportTemplateVersionValueObject.create(invalidReportTemplateVersion)).toThrow(InvalidReportTemplateVersionValueObjectError);
	});

	it("should create a ReportTemplateVersionValueObject instance with a valid report template version", () => {
		const validReportTemplateVersion = "1.0.0";

		const sut = ReportTemplateVersionValueObject.create(validReportTemplateVersion);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validReportTemplateVersion);
		expect(sut).toBeInstanceOf(ReportTemplateVersionValueObject);
	});
});
