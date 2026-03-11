import { callWP, stripHtml, truncate } from "./wp-client.js";

function trimPages(pages) {
  return pages.map((p) => ({
    id: p.id,
    title: stripHtml(p.title?.rendered),
    status: p.status,
    link: p.link,
    modified: p.modified,
  }));
}

function trimPosts(posts) {
  return posts.map((p) => ({
    id: p.id,
    title: stripHtml(p.title?.rendered),
    status: p.status,
    link: p.link,
    date: p.date,
    modified: p.modified,
  }));
}

function trimSingle(item) {
  return {
    id: item.id,
    title: stripHtml(item.title?.rendered),
    status: item.status,
    link: item.link,
    date: item.date,
    modified: item.modified,
    content: truncate(stripHtml(item.content?.rendered)),
    menu_order: item.menu_order,
  };
}

function trimMedia(items) {
  return items.map((m) => ({
    id: m.id,
    title: stripHtml(m.title?.rendered),
    source_url: m.source_url,
    mime_type: m.mime_type,
    date: m.date,
  }));
}

export async function executeTool(toolName, input) {
  let result;

  switch (toolName) {
    case "get_pages": {
      const params = new URLSearchParams({ per_page: "50" });
      if (input.search) params.set("search", input.search);
      result = await callWP({ endpoint: `/wp/v2/pages?${params}` });
      if (result.ok) result.data = trimPages(result.data);
      break;
    }

    case "get_page": {
      result = await callWP({ endpoint: `/wp/v2/pages/${input.page_id}` });
      if (result.ok) result.data = trimSingle(result.data);
      break;
    }

    case "update_page": {
      const body = {};
      if (input.title) body.title = input.title;
      if (input.content) body.content = input.content;
      if (input.status) body.status = input.status;
      result = await callWP({ endpoint: `/wp/v2/pages/${input.page_id}`, method: "POST", body });
      if (result.ok) result.data = trimSingle(result.data);
      break;
    }

    case "get_posts": {
      const params = new URLSearchParams({ per_page: String(input.per_page || 20) });
      if (input.search) params.set("search", input.search);
      result = await callWP({ endpoint: `/wp/v2/posts?${params}` });
      if (result.ok) result.data = trimPosts(result.data);
      break;
    }

    case "get_post": {
      result = await callWP({ endpoint: `/wp/v2/posts/${input.post_id}` });
      if (result.ok) result.data = trimSingle(result.data);
      break;
    }

    case "create_post": {
      const body = {
        title: input.title,
        content: input.content,
        status: input.status || "draft",
      };
      result = await callWP({ endpoint: `/wp/v2/posts`, method: "POST", body });
      if (result.ok) result.data = trimSingle(result.data);
      break;
    }

    case "update_post": {
      const body = {};
      if (input.title) body.title = input.title;
      if (input.content) body.content = input.content;
      if (input.status) body.status = input.status;
      result = await callWP({ endpoint: `/wp/v2/posts/${input.post_id}`, method: "POST", body });
      if (result.ok) result.data = trimSingle(result.data);
      break;
    }

    case "delete_post": {
      result = await callWP({ endpoint: `/wp/v2/posts/${input.post_id}`, method: "DELETE" });
      break;
    }

    case "get_media": {
      const params = new URLSearchParams({ per_page: String(input.per_page || 20) });
      if (input.search) params.set("search", input.search);
      result = await callWP({ endpoint: `/wp/v2/media?${params}` });
      if (result.ok) result.data = trimMedia(result.data);
      break;
    }

    case "get_menus": {
      result = await callWP({ endpoint: `/wp/v2/menus` });
      if (!result.ok) {
        // Try alternative endpoint
        result = await callWP({ endpoint: `/menus/v1/menus` });
      }
      if (!result.ok) {
        result = { ok: true, data: { note: "Menu endpoints are not available. Menus must be managed manually in WordPress admin under Appearance > Menus." } };
      }
      break;
    }

    case "get_team_members": {
      // Try common custom post type slugs
      for (const slug of ["team_member", "team-member", "team", "staff"]) {
        result = await callWP({ endpoint: `/wp/v2/${slug}?per_page=50` });
        if (result.ok) {
          result.data = result.data.map((t) => ({
            id: t.id,
            title: stripHtml(t.title?.rendered),
            menu_order: t.menu_order,
            status: t.status,
            link: t.link,
            content: truncate(stripHtml(t.content?.rendered), 500),
          }));
          break;
        }
      }
      if (!result.ok) {
        result = { ok: true, data: { note: "Could not find team members. The custom post type slug may be different. Try get_site_info to discover available post types." } };
      }
      break;
    }

    case "update_team_member": {
      const body = {};
      if (input.title) body.title = input.title;
      if (input.content) body.content = input.content;
      if (input.menu_order !== undefined) body.menu_order = input.menu_order;
      // Try common slugs
      for (const slug of ["team_member", "team-member", "team", "staff"]) {
        result = await callWP({ endpoint: `/wp/v2/${slug}/${input.member_id}`, method: "POST", body });
        if (result.ok) {
          result.data = trimSingle(result.data);
          break;
        }
      }
      break;
    }

    case "get_site_info": {
      const typesResult = await callWP({ endpoint: `/wp/v2/types` });
      if (typesResult.ok) {
        const types = Object.entries(typesResult.data).map(([slug, info]) => ({
          slug,
          name: info.name,
          rest_base: info.rest_base,
        }));
        result = { ok: true, data: { post_types: types } };
      } else {
        result = typesResult;
      }
      break;
    }

    default:
      result = { ok: false, error: `Unknown tool: ${toolName}` };
  }

  if (!result.ok) {
    return { error: result.error || "WordPress API call failed." };
  }
  return { result: result.data };
}
