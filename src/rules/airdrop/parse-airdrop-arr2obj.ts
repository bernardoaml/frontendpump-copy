type DbAirdropWithTask = {
  id: string;
  name: string;
  description: string;
  coinId: number;
  value: bigint;
  start: Date | null;
  end: Date | null;
  statusId: number;
  status: string | null;
  task: {
    id: string | null;
    name: string | null;
    description: string | null;
    meta: Record<string, unknown> | null;
    value: bigint | null;
    start: Date | null;
    end: Date | null;
    statusId: number | null;
    status: string | null;
  };
};

export const parseAirdropArr2Obj = (airdropArr: DbAirdropWithTask[]) =>
  airdropArr.reduce(
    (a, c) => {
      const {task, ...ta} = c;

      return {
        ...a,
        [c.id]: {
          ...(a?.[c.id] || ta),
          ...(!!c.task.id
            ? {
                tasks: {
                  ...a?.[c.id]?.tasks,
                  [c.task.id]: {
                    id: task.id!,
                    airdropId: c.id,
                    name: task.name!,
                    description: task.description!,
                    meta: task.meta!,
                    value: task.value!,
                    start: task.start,
                    end: task.end,
                    statusId: task.statusId!,
                    status: task.status!,
                  },
                },
              }
            : {}),
        },
      };
    },
    {} as Record<string, Airdrop>,
  );
