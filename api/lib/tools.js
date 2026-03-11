export const WRITE_TOOLS = new Set([
  "update_page",
  "create_post",
  "update_post",
  "delete_post",
  "update_team_member",
]);

export const tools = [
  {
    name: "get_pages",
    description: "List all pages on the WordPress site. Returns page ID, title, status, and link.",
    input_schema: {
      type: "object",
      properties: {
        search: { type: "string", description: "Optional search term to filter pages by title." },
      },
      required: [],
    },
  },
  {
    name: "get_page",
    description: "Get a single page by ID, including its full content.",
    input_schema: {
      type: "object",
      properties: {
        page_id: { type: "number", description: "The WordPress page ID." },
      },
      required: ["page_id"],
    },
  },
  {
    name: "update_page",
    description: "Update an existing page's title, content, or status.",
    input_schema: {
      type: "object",
      properties: {
        page_id: { type: "number", description: "The WordPress page ID to update." },
        title: { type: "string", description: "New page title." },
        content: { type: "string", description: "New page content (HTML)." },
        status: { type: "string", enum: ["publish", "draft", "private"], description: "Page status." },
      },
      required: ["page_id"],
    },
  },
  {
    name: "get_posts",
    description: "List blog posts. Returns post ID, title, status, date, and link.",
    input_schema: {
      type: "object",
      properties: {
        search: { type: "string", description: "Optional search term." },
        per_page: { type: "number", description: "Number of posts to return (default 20, max 100)." },
      },
      required: [],
    },
  },
  {
    name: "get_post",
    description: "Get a single blog post by ID, including its full content.",
    input_schema: {
      type: "object",
      properties: {
        post_id: { type: "number", description: "The WordPress post ID." },
      },
      required: ["post_id"],
    },
  },
  {
    name: "create_post",
    description: "Create a new blog post. Defaults to draft status.",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Post title." },
        content: { type: "string", description: "Post content (HTML)." },
        status: { type: "string", enum: ["publish", "draft", "private"], description: "Post status. Defaults to 'draft'." },
      },
      required: ["title", "content"],
    },
  },
  {
    name: "update_post",
    description: "Update an existing blog post's title, content, or status.",
    input_schema: {
      type: "object",
      properties: {
        post_id: { type: "number", description: "The WordPress post ID to update." },
        title: { type: "string", description: "New post title." },
        content: { type: "string", description: "New post content (HTML)." },
        status: { type: "string", enum: ["publish", "draft", "private"], description: "Post status." },
      },
      required: ["post_id"],
    },
  },
  {
    name: "delete_post",
    description: "Move a blog post to the trash. This can be undone from the WordPress trash.",
    input_schema: {
      type: "object",
      properties: {
        post_id: { type: "number", description: "The WordPress post ID to trash." },
      },
      required: ["post_id"],
    },
  },
  {
    name: "get_media",
    description: "List media library items (images, files). Returns ID, title, URL, and type.",
    input_schema: {
      type: "object",
      properties: {
        search: { type: "string", description: "Optional search term." },
        per_page: { type: "number", description: "Number of items to return (default 20)." },
      },
      required: [],
    },
  },
  {
    name: "get_menus",
    description: "List navigation menus. Note: requires the WP REST API Menus plugin. If this fails, menus must be managed manually in WordPress.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_team_members",
    description: "List team members. These are typically a custom post type. Will try common slugs (team_member, team, staff).",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "update_team_member",
    description: "Update a team member's details or reorder them using the menu_order field.",
    input_schema: {
      type: "object",
      properties: {
        member_id: { type: "number", description: "The team member post ID." },
        title: { type: "string", description: "Team member name." },
        content: { type: "string", description: "Team member bio (HTML)." },
        menu_order: { type: "number", description: "Order position (lower numbers appear first)." },
      },
      required: ["member_id"],
    },
  },
  {
    name: "get_site_info",
    description: "Get general site information and discover available post types and endpoints.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];
