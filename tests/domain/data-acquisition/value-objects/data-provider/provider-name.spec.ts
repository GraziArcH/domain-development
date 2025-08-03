import { InvalidProviderNameValueObjectError, ProviderNameValueObject } from "@/domain/data-acquisition";

describe("ProviderNameValueObject", () => {
	it("should return InvalidProviderNameValueObjectError for an invalid provider name (null)", () => {
		const invalidProviderName = null;

		expect(() => ProviderNameValueObject.create(invalidProviderName)).toThrow(InvalidProviderNameValueObjectError);
	});

	it("should return InvalidProviderNameValueObjectError for an invalid provider name (number)", () => {
		const invalidProviderName = 123;

		expect(() => ProviderNameValueObject.create(invalidProviderName as unknown as string)).toThrow(InvalidProviderNameValueObjectError);
	});

	it("should return InvalidProviderNameValueObjectError for an invalid provider name (empty string)", () => {
		const invalidProviderName = "";

		expect(() => ProviderNameValueObject.create(invalidProviderName)).toThrow(InvalidProviderNameValueObjectError);
	});

	it("should return InvalidProviderNameValueObjectError for an invalid provider name (string with length > 50)", () => {
		const invalidProviderName = "i".repeat(51);

		expect(() => ProviderNameValueObject.create(invalidProviderName)).toThrow(InvalidProviderNameValueObjectError);
	});

	it("should create a ProviderNameValueObject instance with a valid provider name", () => {
		const validProviderName = "Basic Provider Name";

		const sut = ProviderNameValueObject.create(validProviderName);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validProviderName);
		expect(sut).toBeInstanceOf(ProviderNameValueObject);
	});
});
