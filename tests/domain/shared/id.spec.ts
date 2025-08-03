import { IdValueObject, InvalidIdValueObjectError } from "@/domain/shared";

describe("IdValueObject", () => {
	it("should return InvalidIdValueObjectError for an invalid ID (null)", () => {
		const invalidId = null;

		expect(() => IdValueObject.create(invalidId)).toThrow(InvalidIdValueObjectError);
	});

	it("should return InvalidIdValueObjectError for an invalid ID (string)", () => {
		const invalidId = "invalid";

		expect(() => IdValueObject.create(invalidId as unknown as number)).toThrow(InvalidIdValueObjectError);
	});

	it("should return InvalidIdValueObjectError for an invalid ID (zero)", () => {
		const invalidId = 0;

		expect(() => IdValueObject.create(invalidId)).toThrow(InvalidIdValueObjectError);
	});

	it("should return InvalidIdValueObjectError for an invalid ID (negative number)", () => {
		const invalidId = -1;

		expect(() => IdValueObject.create(invalidId)).toThrow(InvalidIdValueObjectError);
	});

	it("should create an IdValueObject instance with a valid ID", () => {
		const validId = 1;

		const sut = IdValueObject.create(validId);

		if (!(sut instanceof Error)) expect(sut.value).toBe(validId);
		expect(sut).toBeInstanceOf(IdValueObject);
	});
});
