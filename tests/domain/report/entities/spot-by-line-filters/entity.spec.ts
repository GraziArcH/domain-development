import {
	ISpotByLineFiltersRepository,
	SpotByLineFiltersEntityModel,
	SpotByLineFiltersDTO,
	SpotByLineFiltersDTOWithoutId,
} from "@/domain/report";
import { SpotByLineFiltersEntity } from "@/domain/report";
import { NotFoundError } from "@/domain/shared";

describe("SpotByLineFiltersEntity", () => {
	let mockRepository: ISpotByLineFiltersRepository;
	let spotByLinePrimaryFiltersEntity: SpotByLineFiltersEntity;
	const mockEntityModel = SpotByLineFiltersEntityModel.create(
		{
			spotByLineId: 1,
			filterId: 1,
			spotByLineFiltersId: 1,
			active: true,
			visible: true,
			createdBy: 1,
			defaultValue:  {}
		}
	);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getById: jest.fn(),
			getAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		};

		spotByLinePrimaryFiltersEntity = new SpotByLineFiltersEntity(mockRepository);
	});

	describe("create", () => {
		it("should create a spot by line primary filter", async () => {
			jest.spyOn(mockRepository, "create").mockResolvedValueOnce(mockEntityModel);

			const result = await spotByLinePrimaryFiltersEntity.create({
				spotByLineId: 1,
				filterId: 2,
				defaultValue: {},
				visible: true,
				active: true,
				createdBy: 1
			} as SpotByLineFiltersDTOWithoutId);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getById", () => {
		it("should return a spot by line primary filter by id", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);

			const result = await spotByLinePrimaryFiltersEntity.getById(1);

			expect(result).toEqual(mockEntityModel);
		});

		it("should return null if spot by line primary filter does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			const result = await spotByLinePrimaryFiltersEntity.getById(999);

			expect(result).toBeNull();
		});
	});

	describe("getAll", () => {
		it("should return all spot by line primary filters", async () => {
			const mockSpotByLineFilters = [mockEntityModel];

			jest.spyOn(mockRepository, "getAll").mockResolvedValueOnce(mockSpotByLineFilters);

			const result = await spotByLinePrimaryFiltersEntity.getAll();

			expect(result).toEqual(mockSpotByLineFilters);
		});
	});

	describe("update", () => {
		it("should update a spot by line primary filter", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "update").mockResolvedValueOnce(mockEntityModel);

			const result = await spotByLinePrimaryFiltersEntity.update({
				spotByLineFiltersId: 1,
				spotByLineId: 2,
				filterId: 3,
				defaultValue: {},
				visible: true,
				active: true,
				createdBy: 1
			} as SpotByLineFiltersDTO);

			expect(result).toEqual(mockEntityModel);
		});

		it("should throw NotFoundError if spot by line primary filter does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await expect(async () => {
				await spotByLinePrimaryFiltersEntity.update({
					spotByLineFiltersId: 999,
					spotByLineId: 2,
					filterId: 3,
					defaultValue: {},
					visible: true,
					active: true,
					createdBy: 1
				} as SpotByLineFiltersDTO);
			}).rejects.toThrow(NotFoundError);
		});
	});

	describe("delete", () => {
		it("should delete a spot by line primary filter", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(mockEntityModel);

			const result = await spotByLinePrimaryFiltersEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});

		it("should throw NotFoundError if spot by line primary filter does not exist", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await expect(async () => {
				await spotByLinePrimaryFiltersEntity.delete(999);
			}).rejects.toThrow(NotFoundError);
		});
	});
});
