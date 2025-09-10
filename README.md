# Smart Task Manager (Salesforce LWC Project)

🚀 A Lightning Web Component (LWC) based Task Manager built on Salesforce Platform.

## 📌 Features
- Add New Task with Title, Description, Status, Priority, and Deadline
- Display Task List in card format
- Color-coded badges for Status, Priority, and Deadline
- Delete tasks easily
- Uses Apex Controller for CRUD operations

## 🛠️ Tech Stack
- **Salesforce Lightning Web Components (LWC)**
- **Apex (Server-Side Controller)**
- **SOQL Queries**
- **Custom Object: Task__c**


## 🔧 How It Works
1. User fills the form (Task Title, Description, Status, Priority, Deadline).
2. On "Save Task" → LWC calls Apex `saveTask()` → record insert/update in Salesforce.
3. Task list refresh hota hai via `getTasks()`.
4. User can delete task → Apex `deleteTask()` executes → UI refresh.
5. All tasks are displayed in grid format with badges for clarity.

## 👨‍💻 Author
**Saurabh Maurya**  
Salesforce Developer | BCA Graduate | Passionate about LWC & Apex
