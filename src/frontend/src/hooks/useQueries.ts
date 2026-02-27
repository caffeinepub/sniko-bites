import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Sneaker } from "../backend.d";
import { useActor } from "./useActor";

const SEED_KEY = "sniko_bites_seeded";

export function useSeedAndFetch() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const seedMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      await actor.seedSneakers();
      localStorage.setItem(SEED_KEY, "true");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sneakers"] });
    },
  });

  const allSneakersQuery = useQuery<Sneaker[]>({
    queryKey: ["sneakers", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSneakers();
    },
    enabled: !!actor && !isFetching,
  });

  const featuredSneakersQuery = useQuery<Sneaker[]>({
    queryKey: ["sneakers", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedSneakers();
    },
    enabled: !!actor && !isFetching,
  });

  return {
    allSneakers: allSneakersQuery.data ?? [],
    featuredSneakers: featuredSneakersQuery.data ?? [],
    isLoading: allSneakersQuery.isLoading || featuredSneakersQuery.isLoading,
    seed: seedMutation.mutate,
    isSeeded: !!localStorage.getItem(SEED_KEY),
    actorReady: !!actor && !isFetching,
  };
}

export function useGetSneakerById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Sneaker>({
    queryKey: ["sneaker", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error("No actor or id");
      return actor.getSneakerById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export type { Sneaker };
