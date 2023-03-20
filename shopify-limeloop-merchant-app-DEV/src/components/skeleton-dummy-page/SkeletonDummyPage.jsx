import React from "react";

import { SkeletonPage, Layout, Card, SkeletonBodyText } from "@shopify/polaris";

function SkeletonDummyPage() {
  return (
    <SkeletonPage fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default SkeletonDummyPage;
