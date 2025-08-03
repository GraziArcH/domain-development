import {
	InvalidReportTemplateDescriptionValueObjectError,
	ReportTemplateDescriptionValueObject,
} from "@/domain/report"; 

describe("ReportTemplateDescriptionValueObject", () => {
	it("should return InvalidReportTemplateDescriptionValueObjectError for an invalid report template description (null)", () => {
		const invalidReportTemplateDescription = null;

		expect(() => ReportTemplateDescriptionValueObject.create(
			invalidReportTemplateDescription
		)).toThrow(InvalidReportTemplateDescriptionValueObjectError);
	});

	it("should return InvalidReportTemplateDescriptionValueObjectError for an invalid report template description (number)", () => {
		const invalidReportTemplateDescription = 123;

		expect(() => ReportTemplateDescriptionValueObject.create(
			invalidReportTemplateDescription as unknown as string
		)).toThrow(InvalidReportTemplateDescriptionValueObjectError);
	});

	it("should return InvalidReportTemplateDescriptionValueObjectError for an invalid report template description (empty string)", () => {
		const invalidReportTemplateDescription = "";

		expect(() => ReportTemplateDescriptionValueObject.create(
			invalidReportTemplateDescription
		)).toThrow(InvalidReportTemplateDescriptionValueObjectError);
	});

	it("should return InvalidReportTemplateDescriptionValueObjectError for an invalid report template description (string with length > 50)", () => {
		const invalidReportTemplateDescription =
			"InvalidReportTemplateDescriptionWithLengthMoreThan50Characters";

		expect(() => ReportTemplateDescriptionValueObject.create(
			invalidReportTemplateDescription
		)).toThrow(InvalidReportTemplateDescriptionValueObjectError);
	});

	it("should create a ReportTemplateDescriptionValueObject instance with a valid report template description", () => {
		const validReportTemplateDescription = "Basic Report Template Description";

		const sut = ReportTemplateDescriptionValueObject.create(
			validReportTemplateDescription
		);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validReportTemplateDescription);
		expect(sut).toBeInstanceOf(ReportTemplateDescriptionValueObject);
	});
});
