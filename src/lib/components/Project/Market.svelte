<script lang="ts">
  import { onMount } from "svelte";
  import markdownIt from "markdown-it";
  import mermaid from "mermaid";

  const { markdown } = $props();

  let htmlContent = $state('');

  onMount(async () => {
      const md = markdownIt({ html: true });
      let rendered = md.render(markdown);

      const mermaidBlockRegex = /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g;
      let match;
      let diagrams = [];
      let promises = [];

      while ((match = mermaidBlockRegex.exec(rendered)) !== null) {
        const diagram = match[1]
          .replace(/&quot;/g, "\"")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")
          .replace(/\r/g, "");

          promises.push(mermaid.render(`mermaid-${diagrams.length}-${Date.now()}`, diagram));
          diagrams.push(match[0]);
      }

      const svgs = await Promise.all(promises);

      svgs.forEach((svg, i) => {
        rendered = rendered.replace(diagrams[i], svg.svg);
      });

      htmlContent = rendered;
  });
</script>

<div id="market-markdown" class="prose max-w-none">
  {@html htmlContent}
</div>