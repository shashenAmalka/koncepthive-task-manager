interface TaskInput {
    title?: string;
    priority?: string;
    dueDate?: string;
    status?: string;
}

const VALID_PRIORITIES = ["LOW", "MEDIUM", "HIGH"];
const VALID_STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED"];

export const validateTaskInput = (data: TaskInput, isUpdate = false) => {
    const errors: string[] = [];

    // On create, these fields are required. On update, only validate if present.
    if (!isUpdate || data.title !== undefined) {
        if (!data.title || data.title.trim().length === 0) {
            errors.push("Title is required");
        }
    }

    if (!isUpdate || data.priority !== undefined) {
        if (!data.priority) {
            errors.push("Priority is required");
        } else if (!VALID_PRIORITIES.includes(data.priority)) {
            errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(", ")}`);
        }
    }

    if (!isUpdate || data.status !== undefined) {
        if (!data.status) {
            errors.push("Status is required");
        } else if (!VALID_STATUSES.includes(data.status)) {
            errors.push(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
        }
    }

    if (!isUpdate || data.dueDate !== undefined) {
        if (!data.dueDate) {
            errors.push("Due date is required");
        } else {
            const due = new Date(data.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (isNaN(due.getTime())) {
                errors.push("Due date must be a valid date");
            } else if (due < today) {
                errors.push("Due date cannot be earlier than today");
            }
        }
    }

    return errors;
};