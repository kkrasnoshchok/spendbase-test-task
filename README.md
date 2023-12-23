<h1>Відповіді на питання, поставленні в задачі:</h1>
<h3 className={styles.structureAnswerTitle}>Структура даних для папок та файлів, яку б ви хотіли отримувати від API</h3>
<p>We receive such object/s from API</p>
1. TypeScript
<pre>
{
    id: '3', // uuid of the element 
    extension: '', // extension to identify whether it's file or folder (in folders we have empty extension)
    name: 'Empty Folder',
    parentIds: ['0'], // parent ids to be discussed with backend team (whether it's easier to calculate on client side or by them. Would be nice to get this data for less calculations and better rendering speed on client)
    access: 'read', // access levels ('admin' | 'read' | 'write' and any customs)
    children: RootObject[], // children contain inner files or folders. It's always empty in `files`. It's recursive type, which is the same as it's parent
    dateCreated: Date
    dateLastModified: Date, // Would be nice to get both created and last modified data, which could be very helpful for user on client
    size: number,
}
</pre>
2. JSON
<pre>
{
  "id": "",
  "extension": "",
  "name": "",
  "parentIds": [""],
  "access": "",
  "children": [],
  "dateCreated": "2023-12-23T15:55:43.018Z", // just example of the date
  "dateLastModified": "2023-12-23T15:55:43.018Z", // just example of the date
  "size": 0
}
</pre>
3. PostgreSQL
<pre>
CREATE TABLE mytable (
    id UUID PRIMARY KEY,
    extension TEXT,
    name TEXT,
    parentIds JSON,
    access TEXT,
    children JSON,
    dateCreated TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    dateLastModified TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    size BIGINT
);
</pre>
<hr />
<p>Identification of item type(File/Folder). It is not needed for tasks I had to do, but will be needed for navigation inside of a folder/s and opening files: </p>
1. Empty Folder
<pre className={styles.structureAnswerCode}>
{
    id: '3',
    extension: '',
    name: 'Empty Folder',
    parentIds: ['0'],
    access: 'read',
    children: [],
    ....
}
</pre>
2. File
<pre className={styles.structureAnswerCode}>
{
    id: '5',
    extension: 'png',
    name: 'Png File',
    parentIds: ['0', '2', '4'],
    access: 'read',
    children: [],
    ....
}
</pre>

---

<h3>Потенційні вразливі місця з точки зору продуктивності</h3>
<ul>
<li>Через те що для пошуку, відображення, видалення та сортування(в майбутньому) та ще велику кількість операцій ми використовуємо рекурсію, ми маємо проблеми з усіма цими операціями за умови великої кількості та глибокої вкладенности даних. Це все буде довго завантажуватись, довго видалятись, довго шукатись за великої кількості даних
</li>

<hr />
<li>
Величезний кусок даних, які ми отримуємо одразу, адже що root файли і папки, що всі вкладені ми отримуємо одночасно. Ми не можемо просто вирішити цю проблему за допомогою lazy loading всіх вкладених даних, через те що це по факту вбʼє UX. 
</li>
<li>
Але ми могли б альтернативним чином зберігати локацію файлу / папки, а саме однією string розділеною по слешу. Наприклад, якщо файл лежить в папці admin, що лежить ще в двох папках root і user, то ми могли б зберігати location: "user/root/admin" і робити пріоритетніші запроси на user, потім root, потім admin, щоб розвантажити процес отримання даних.
</li>
<hr />
    
</ul>
