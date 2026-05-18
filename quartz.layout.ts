import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {}
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "collapse",
      sortFn: (a, b) => {
        const aName = a.data?.filePath ?? a.displayName
        const bName = b.data?.filePath ?? b.displayName

        return aName.localeCompare(bName)
      },
      mapFn: (node) => {
        let name = node.displayName.replace(/^\d+-/, "")

        const smallWords = ["the", "of", "and", "in"]

        name = name
          .split("-")
          .map((word, index) => {
            if (index !== 0 && smallWords.includes(word)) return word
            return word.charAt(0).toUpperCase() + word.slice(1)
          })
          .join(" ")

        node.displayName = name
        return node
      },
    }),
  ],
  right: [
    //Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "collapse",
      sortFn: (a, b) => {
        const aName = a.data?.filePath ?? a.displayName
        const bName = b.data?.filePath ?? b.displayName

        return aName.localeCompare(bName)
      },
      mapFn: (node) => {
        let name = node.displayName.replace(/^\d+-/, "")

        const smallWords = ["the", "of", "and", "in"]

        name = name
          .split("-")
          .map((word, index) => {
            if (index !== 0 && smallWords.includes(word)) return word
            return word.charAt(0).toUpperCase() + word.slice(1)
          })
          .join(" ")

        node.displayName = name
        return node
      },
    }),
  ],
  right: [],
}
