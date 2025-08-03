import { ReportTypeDescriptionValueObject } from "@/domain/report"; 

describe("ReportTypeDescriptionValueObject", () => {
	it("should return InvalidReportTypeDescriptionValueObjectError for an invalid report type description (null)", () => {
		const invalidReportTypeDescription = null;

		expect(() => ReportTypeDescriptionValueObject.create(invalidReportTypeDescription)).toThrow();
	});

	it("should return InvalidReportTypeDescriptionValueObjectError for an invalid report type description (number)", () => {
		const invalidReportTypeDescription = 123;

		expect(() => ReportTypeDescriptionValueObject.create(invalidReportTypeDescription as unknown as string)).toThrow();
	});

	it("should return InvalidReportTypeDescriptionValueObjectError for an invalid report type description (empty string)", () => {
		const invalidReportTypeDescription = "";

		expect(() => ReportTypeDescriptionValueObject.create(invalidReportTypeDescription)).toThrow();
	});

	it("should return InvalidReportTypeDescriptionValueObjectError for an invalid report type description (string with length > 50)", () => {
		const invalidReportTypeDescription = "InvalidReportTypeDescriptionWithLengthMoreThan50Characters";

		expect(() => ReportTypeDescriptionValueObject.create(invalidReportTypeDescription)).toThrow();
	});

	it("should create a ReportTypeDescriptionValueObject instance with a valid report type description", () => {
		const validReportTypeDescription = "Basic Report Type Description";

		const sut = ReportTypeDescriptionValueObject.create(validReportTypeDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validReportTypeDescription);
		expect(sut).toBeInstanceOf(ReportTypeDescriptionValueObject);
	});
});