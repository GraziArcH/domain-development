import { WorkspaceDescriptionValueObject } from "@/domain/report-geoserver";

describe("WorkspaceDescriptionValueObject", () => {
	it("should return InvalidWorkspaceDescriptionValueObjectError for an invalid workspace description (null)", () => {
		const invalidWorkspaceDescription = null;

		expect(() => WorkspaceDescriptionValueObject.create(invalidWorkspaceDescription)).toThrow();
	});

	it("should return InvalidWorkspaceDescriptionValueObjectError for an invalid workspace description (number)", () => {
		const invalidWorkspaceDescription = 123;

		expect(() => WorkspaceDescriptionValueObject.create(invalidWorkspaceDescription as unknown as string)).toThrow();
	});

	it("should return InvalidWorkspaceDescriptionValueObjectError for an invalid workspace description (empty string)", () => {
		const invalidWorkspaceDescription = "";

		expect(() => WorkspaceDescriptionValueObject.create(invalidWorkspaceDescription)).toThrow();
	});

	it("should return InvalidWorkspaceDescriptionValueObjectError for an invalid workspace description (string with length > 255)", () => {
		const invalidWorkspaceDescription = "c".repeat(256);

		expect(() => WorkspaceDescriptionValueObject.create(invalidWorkspaceDescription)).toThrow();
	});

	it("should create a WorkspaceDescriptionValueObject instance with a valid workspace description", () => {
		const validWorkspaceDescription = "ValidWorkspaceDescription";

		const sut = WorkspaceDescriptionValueObject.create(validWorkspaceDescription);

		expect(sut).toBeInstanceOf(WorkspaceDescriptionValueObject);
	});
});
