type Entity =
  | "club"
  | "clubSeason"
  | "game"
  | "goal"
  | "league"
  | "leagueSeason"
  | "player"
  | "playerSeason";

export const add = async <CREATE, RETURN>(entity: Entity, data: CREATE) => {
  const response = await fetch(`/api/${entity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return (await response.json()) as RETURN;
};

export const getAll = async <RETURN>(entity: Entity) => {
  const response = await fetch(`/api/${entity}`, { method: "GET" });
  return (await response.json()) as RETURN[];
};

export const remove = async (entity: Entity, id: string) => {
  const response = await fetch(`/api/${entity}/${id}`, { method: "DELETE" });
  return response;
};

export const getAllFilteredById = async <RETURN>(
  entity: Entity,
  filter: Entity,
  id: string,
) => {
  const response = await fetch(`/api/${entity}?${filter}Id=${id}`, {
    method: "GET",
  });
  return (await response.json()) as RETURN[];
};
