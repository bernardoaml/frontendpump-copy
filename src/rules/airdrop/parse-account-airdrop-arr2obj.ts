type DbAccountAirdropWithTask = {
  id: string;
  accountId: string;
  airdropId: string;
  airdropName?: string | null;
  airdropDescription?: string | null;
  airdropValue?: bigint | null;
  totalAchieved: bigint;
  statusId: number;
  status: string | null;
  task: {
    id: string | null;
    taskId: string | null;
    taskName?: string | null;
    taskValue?: bigint | null;
    validator: string | null;
    statusId: number | null;
    status: string | null;
  };
};

export const parseAccountAirdropArr2Obj = (
  airdropArr: DbAccountAirdropWithTask[],
  single?: boolean,
) =>
  airdropArr.reduce(
    (a, c) => {
      const {task, ...ta} = c;

      const id = single ? `${c.accountId}:${c.airdropId}` : c.id;

      return {
        ...a,
        [id]: {
          ...(a?.[id] || ta),
          ...(!!task.id && !!task.taskId
            ? {
                tasks: {
                  ...(a?.[id]?.tasks ?? {}),
                  [task.taskId]: {
                    id: task.id!,
                    taskId: task.taskId!,
                    ...(task.taskName ? {taskName: task.taskName!} : {}),
                    ...(task.taskValue ? {taskValue: task.taskValue!} : {}),
                    validator: task.validator ?? null,
                    statusId: task.statusId!,
                    status: task.status!,
                  },
                },
              }
            : {}),
        },
      };
    },
    {} as Record<string, AccountAirdrop>,
  );
