import { ReportTypeNameValueObject } from "@/domain/report"; 

describe("ReportTypeNameValueObject", () => {
	it("should return InvalidReportTypeNameValueObjectError for an invalid report type name (null)", () => {
		const invalidReportTypeName = null;

		expect(() => ReportTypeNameValueObject.create(invalidReportTypeName)).toThrow();
	});

	it("should return InvalidReportTypeNameValueObjectError for an invalid report type name (number)", () => {
		const invalidReportTypeName = 123;

		expect(() => ReportTypeNameValueObject.create(invalidReportTypeName as unknown as string)).toThrow();
	});

	it("should return InvalidReportTypeNameValueObjectError for an invalid report type name (empty string)", () => {
		const invalidReportTypeName = "";

		expect(() => ReportTypeNameValueObject.create(invalidReportTypeName)).toThrow();
	});

	it("should return InvalidReportTypeNameValueObjectError for an invalid report type name (string with length > 30)", () => {
		const invalidReportTypeName = "InvalidReportTypeNameWithLengthMoreThan30Characters";

		expect(() => ReportTypeNameValueObject.create(invalidReportTypeName)).toThrow();
	});

	it("should create a ReportTypeNameValueObject instance with a valid report type name", () => {
		const validReportTypeName = "BasicReportTypeName";

		const sut = ReportTypeNameValueObject.create(validReportTypeName);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validReportTypeName);
		expect(sut).toBeInstanceOf(ReportTypeNameValueObject);
	});
});