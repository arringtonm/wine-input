# **Oregon Wine Industry Mapping**

## **Overview**

The Oregon Wine Industry Mapping project visualizes the interconnectedness of the wine industry in Oregon's Willamette Valley. The application maps **people** and **wineries** as nodes and represents their relationships as connections (links). These connections highlight roles like winemakers or owners and interpersonal relationships such as marriages or parent-child links. This project is also relying **heavily** on ChatGPT 4.0 and is an experiment for me as the 'author' in testing and adjusting my use of prompts.

This project serves as a proof of concept, focusing initially on local data storage and later integrating a Firebase or similar database. The application is built with **Vue 3**, **TypeScript**, and **Vis.js** for intuitive, interactive graph visualization.

---

## **Features**

### **1. Interactive Graph Visualization**

- **Nodes:**

  - Represent **people** and **wineries**.
  - Dynamically colored by type (e.g., `Winery` nodes are orange).
  - Include hoverable tooltips with additional details.

- **Links:**

  - Represent relationships between nodes.
  - Labelled with the type of connection (e.g., "Owner," "Spouse").
  - Connection labels are positioned slightly offset from the links.

- **Physics-Driven Layout:**
  - The graph employs physics for an intuitive layout, ensuring nodes and links are well-spaced.

### **2. Node Types**

- **Person:**

  - Required fields:
    - `name` (string)
    - `id` (string)
  - Optional fields:
    - `age` (number)
    - `bio` (string)
    - `image` (URL string; defaults to "No image available" if not provided).

- **Winery:**
  - Required fields:
    - `name` (string)
    - `id` (string)
    - `location` (string; AVA or geographic location)
  - Optional fields:
    - `established` (date or year)
    - `logo` (URL string).

### **3. Relationship Types**

- **Person ↔ Winery:**

  - **Owner**: Boolean checkbox.
  - **Winemaker**: Boolean checkbox with optional subtypes:
    - Head Winemaker
    - Assistant Winemaker
    - Consultant Winemaker
  - Timeframes: Can include `startDate` and `endDate`.

- **Person ↔ Person:**
  - **Spouse**: Relationship indicating marriage.
  - **Parent/Child**: Specifies the parent and the child.

### **4. Admin Panel**

- Admin tools allow input and editing of:
  - New **nodes** (people or wineries).
  - New **links** (relationships or roles).
- Inputs include dropdowns for relationship types and logic to ensure valid connections (e.g., identifying the parent in parent/child relationships).

---

## **Technical Details**

- **Framework:** Vue 3
- **Language:** TypeScript
- **Visualization Library:** Vis.js
- **Database:** Currently uses local storage; plans to integrate Firebase.

### **Core Functionality**

1. **Graph Structure:**

   - Nodes are represented as an array of objects with attributes like `id`, `name`, and type-specific fields.
   - Links are represented as objects connecting `source` and `target` nodes, with relationship metadata.

2. **Interactivity:**

   - Nodes and links are interactive:
     - Hovering on a node displays a modal-like card with the name and bio.
     - Connection labels are shown near links for easy identification.

3. **Performance:**
   - Physics calculations are optimized to improve loading times.
   - The graph's layout stabilizes after rendering, disabling physics for smooth interactions.

---

## **Setup and Usage**

### **Installation**

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### **Run the Project**

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

### **Building for Production**

To build the project for deployment:

```bash
npm run build
```

---

## **Future Enhancements**

- **Database Integration:** Transition from local storage to Firebase for data persistence.
- **Role-Based Access Control:** Hide the admin panel behind a secure login.
- **Dynamic Graph Features:** Allow real-time updates and filtering of nodes and links.
- **Expanded Visualization:** Support for larger datasets with performance optimizations.

---

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to your fork.
4. Create a pull request describing your changes.

---

## **License**

This project is licensed under the [MIT License](LICENSE).
