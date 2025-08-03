import {
	InvalidReportTemplateTitleValueObjectError,
	ReportTemplateTitleValueObject,
} from "@/domain/report"; 

describe("ReportTemplateTitleValueObject", () => {
	it("should return InvalidReportTemplateTitleValueObjectError for an invalid report template title (null)", () => {
		const invalidReportTemplateTitle = null;

		expect(() => ReportTemplateTitleValueObject.create(invalidReportTemplateTitle)).toThrow(InvalidReportTemplateTitleValueObjectError);
	});

	it("should return InvalidReportTemplateTitleValueObjectError for an invalid report template title (number)", () => {
		const invalidReportTemplateTitle = 123;

		expect(() => ReportTemplateTitleValueObject.create(
			invalidReportTemplateTitle as unknown as string
		)).toThrow(InvalidReportTemplateTitleValueObjectError);
	});

	it("should return InvalidReportTemplateTitleValueObjectError for an invalid report template title (empty string)", () => {
		const invalidReportTemplateTitle = "";

		expect(() => ReportTemplateTitleValueObject.create(invalidReportTemplateTitle)).toThrow(InvalidReportTemplateTitleValueObjectError);
	});

	it("should return InvalidReportTemplateTitleValueObjectError for an invalid report template title (string with length > 100)", () => {
		const invalidReportTemplateTitle = "InvalidReportTemplateTitleWithLengthMoreThan100Charactersaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

		expect(() => ReportTemplateTitleValueObject.create(invalidReportTemplateTitle)).toThrow(InvalidReportTemplateTitleValueObjectError);
	});

	it("should create a ReportTemplateTitleValueObject instance with a valid report template title", () => {
		const validReportTemplateTitle = "BasicReport";

		const sut = ReportTemplateTitleValueObject.create(validReportTemplateTitle);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validReportTemplateTitle);
		expect(sut).toBeInstanceOf(ReportTemplateTitleValueObject);
	});
});
