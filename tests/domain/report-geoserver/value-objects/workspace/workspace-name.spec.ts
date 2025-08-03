import { WorkspaceNameValueObject } from "@/domain/report-geoserver";

describe("WorkspaceNameValueObject", () => {
	it("should return InvalidWorkspaceNameValueObjectError for an invalid workspace name (null)", () => {
		const invalidWorkspaceName = null;

		expect(() => WorkspaceNameValueObject.create(invalidWorkspaceName)).toThrow();
	});

	it("should return InvalidWorkspaceNameValueObjectError for an invalid workspace name (number)", () => {
		const invalidWorkspaceName = 123;

		expect(() => WorkspaceNameValueObject.create(invalidWorkspaceName as unknown as string)).toThrow();
	});

	it("should return InvalidWorkspaceNameValueObjectError for an invalid workspace name (empty string)", () => {
		const invalidWorkspaceName = "";

		expect(() => WorkspaceNameValueObject.create(invalidWorkspaceName)).toThrow();
	});

	it("should return InvalidWorkspaceNameValueObjectError for an invalid workspace name (string with length > 255)", () => {
		const invalidWorkspaceName = "c".repeat(256);

		expect(() => WorkspaceNameValueObject.create(invalidWorkspaceName)).toThrow();
	});

	it("should create a WorkspaceNameValueObject instance with a valid workspace name", () => {
		const validWorkspaceName = "ValidWorkspaceName";

		const sut = WorkspaceNameValueObject.create(validWorkspaceName);

		expect(sut).toBeInstanceOf(WorkspaceNameValueObject);
	});
});
