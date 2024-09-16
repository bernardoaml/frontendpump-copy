'use server';

import {auth} from '@rules/auth';
import {validate} from '@rules/form-validation';
import {apiValidateTaskSchema as schema} from '@rules/form-validation/api/airdrop/api-validate-task.schema';

import {addAccountAirdropTask} from './add-account-airdrop-task';
import {getAccountTask} from './get-account-task';

export async function validateTask(_prevState: unknown, formData: FormData) {
  const formDataEntries = Object.fromEntries(formData.entries());
  const {success, data, error} = validate(formDataEntries, schema);
  if (!success) return {message: error.errorMsg, errorData: error.data};

  const {airdropTaskId, validator} = data;

  const session = await auth();
  if (!session) return {message: 'Unauthorized'};

  const {id: accountId} = session.user;

  const aaTask = await getAccountTask({accountId, airdropTaskId});
  if (aaTask && 'errorMsg' in aaTask) return {message: aaTask.errorMsg};

  const {accountTask} = aaTask;

  if (aaTask && !!accountTask?.status)
    return {
      message: `This task has status ${accountTask.status}`,
      accountTask,
    };

  const addTask = await addAccountAirdropTask(
    {accountId, accountTaskData: aaTask, validator},
    accountId,
  );

  if (addTask && 'errorMsg' in addTask) return {message: addTask.errorMsg};

  return {message: '', accountTask: addTask};
}
