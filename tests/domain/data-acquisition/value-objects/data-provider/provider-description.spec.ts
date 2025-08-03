import { InvalidProviderDescriptionValueObjectError, ProviderDescriptionValueObject } from "@/domain/data-acquisition";

describe("ProviderDescriptionValueObject", () => {
	it("should return InvalidProviderDescriptionValueObjectError for an invalid provider description (null)", () => {
		const invalidProviderDescription = null;

		expect(() => ProviderDescriptionValueObject.create(invalidProviderDescription)).toThrow(InvalidProviderDescriptionValueObjectError);
	});

	it("should return InvalidProviderDescriptionValueObjectError for an invalid provider description (number)", () => {
		const invalidProviderDescription = 123;

		expect(() => ProviderDescriptionValueObject.create(invalidProviderDescription as unknown as string)).toThrow(InvalidProviderDescriptionValueObjectError);
	});

	it("should return InvalidProviderDescriptionValueObjectError for an invalid provider description (empty string)", () => {
		const invalidProviderDescription = "";

		expect(() => ProviderDescriptionValueObject.create(invalidProviderDescription)).toThrow(InvalidProviderDescriptionValueObjectError);
	});

	it("should return InvalidProviderDescriptionValueObjectError for an invalid provider description (string with length > 30)", () => {
		const invalidProviderDescription = "InvalidProviderDescriptionWithLengthMoreThan30Characters";

		expect(() => ProviderDescriptionValueObject.create(invalidProviderDescription)).toThrow(InvalidProviderDescriptionValueObjectError);
	});

	it("should create a ProviderDescriptionValueObject instance with a valid provider description", () => {
		const validProviderDescription = "Basic Provider Description";

		const sut = ProviderDescriptionValueObject.create(validProviderDescription);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validProviderDescription);
		expect(sut).toBeInstanceOf(ProviderDescriptionValueObject);
	});
});
