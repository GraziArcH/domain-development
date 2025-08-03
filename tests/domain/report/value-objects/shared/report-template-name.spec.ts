import {
	InvalidReportTemplateNameValueObjectError,
	ReportTemplateNameValueObject,
} from "@/domain/report"; 

describe("ReportTemplateNameValueObject", () => {
	it("should return InvalidReportTemplateNameValueObjectError for an invalid report template name (null)", () => {
		const invalidReportTemplateName = null;

		expect(() => ReportTemplateNameValueObject.create(invalidReportTemplateName)).toThrow(InvalidReportTemplateNameValueObjectError);
	});

	it("should return InvalidReportTemplateNameValueObjectError for an invalid report template name (number)", () => {
		const invalidReportTemplateName = 123;

		expect(() => ReportTemplateNameValueObject.create(
			invalidReportTemplateName as unknown as string
		)).toThrow(InvalidReportTemplateNameValueObjectError);
	});

	it("should return InvalidReportTemplateNameValueObjectError for an invalid report template name (empty string)", () => {
		const invalidReportTemplateName = "";

		expect(() => ReportTemplateNameValueObject.create(invalidReportTemplateName)).toThrow(InvalidReportTemplateNameValueObjectError);
	});

	it("should return InvalidReportTemplateNameValueObjectError for an invalid report template name (string with length > 30)", () => {
		const invalidReportTemplateName = "InvalidReportTemplateNameWithLengthMoreThan30Characters";

		expect(() => ReportTemplateNameValueObject.create(invalidReportTemplateName)).toThrow(InvalidReportTemplateNameValueObjectError);
	});

	it("should create a ReportTemplateNameValueObject instance with a valid report template name", () => {
		const validReportTemplateName = "BasicReportTemplateName";

		const sut = ReportTemplateNameValueObject.create(validReportTemplateName);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validReportTemplateName);
		expect(sut).toBeInstanceOf(ReportTemplateNameValueObject);
	});
});
