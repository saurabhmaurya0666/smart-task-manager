import { LightningElement, wire } from 'lwc';
import getTasks from '@salesforce/apex/TaskManagerController.getTasks';
import saveTaskRecord from '@salesforce/apex/TaskManagerController.saveTask';
import deleteTaskRecord from '@salesforce/apex/TaskManagerController.deleteTask';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SmartTaskManager extends LightningElement {
    tasks = [];
    taskName = '';
    description = '';
    status = '';
    priority = '';
    dueDate = '';
    wiredTaskResult;

    // Picklist values
    statusOptions = [
        { label: 'Pending', value: 'Pending' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' }
    ];

    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
    ];

    // Fetch tasks
    @wire(getTasks)
    wiredTasks(result) {
        this.wiredTaskResult = result;
        if (result.data) {
            this.tasks = result.data;
        } else if (result.error) {
            this.showToast('Error', 'Failed to load tasks ❌', 'error');
        }
    }

    // Handle input change
    handleInputChange(event) {
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    // Save task
    saveTask() {
        if (!this.taskName) {
            this.showToast('Validation Error', 'Task Title is required ⚠️', 'warning');
            return;
        }

        const taskRecord = {
            Name: this.taskName,
            Description__c: this.description,
            Status__c: this.status,
            Priority__c: this.priority,
            Deadline__c: this.dueDate   // ✅ fixed field name
        };

        saveTaskRecord({ task: taskRecord })
            .then(() => {
                this.showToast('Success', 'Task saved successfully ✅', 'success');
                this.clearForm();
                return refreshApex(this.wiredTaskResult);
            })
            .catch(error => {
                this.showToast('Error', error.body?.message || 'Something went wrong ❌', 'error');
            });
    }

    // Delete task
    deleteTask(event) {
        const taskId = event.target.dataset.id;
        deleteTaskRecord({ taskId })
            .then(() => {
                this.showToast('Success', 'Task deleted successfully 🗑️', 'success');
                return refreshApex(this.wiredTaskResult);
            })
            .catch(error => {
                this.showToast('Error', error.body?.message || 'Failed to delete task ❌', 'error');
            });
    }

    // Clear form
    clearForm() {
        this.taskName = '';
        this.description = '';
        this.status = '';
        this.priority = '';
        this.dueDate = '';
    }

    // Toast
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}