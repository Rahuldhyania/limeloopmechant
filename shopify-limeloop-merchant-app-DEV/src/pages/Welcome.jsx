import React, { useEffect, useContext } from "react";
import { Page, Layout, Card, Heading } from '@shopify/polaris';
import { useHistory } from "react-router-dom";
import SkeletonDummyPage from "../components/skeleton-dummy-page/SkeletonDummyPage";
import * as actions from "../store/actions";
import { store } from "../store/store";
import { verifyConfig } from "../constants/methods/verifyConfig";
import form from "../assets/form.png"
import emptyForm from "../assets/emptyForm.png"

function Welcome() {
    const history = useHistory();
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const loading = globalState.state.loading;

    useEffect(() => {
        verifyConfiguration();
    }, []);

    async function verifyConfiguration() {
        dispatch(actions.setLoading(true));
        await verifyConfig().then(res => {
            history.push('/orders');
            dispatch(actions.setLoading(false));
        }).catch(err => {
            dispatch(actions.setLoading(false));
        });
    }

    if (loading) {
        return <SkeletonDummyPage></SkeletonDummyPage>;
      } else {
        return (
            <Page title='Welcome to the LimeLoop Shopify App'>
                <Layout>
                    <Layout.Section>
                        <Card>
                            <Card.Section>
                                <p>Here you’ll be able to sync your Shopify orders with LimeLoop to make tracking and shipping management a breeze. Please see the instructions below to get started.</p>
                                <br/>
                                <img src={emptyForm} width="75%" />
                                <Heading>New To LimeLoop?</Heading>
                                <p>You must create a LimeLoop <b>Brand</b> account to get started. To do so, use this <a target='_blank' href='https://www.thelimeloopapp.com/brand-signup'><b>link</b></a> to sign up, be sure to enter your shopify domain when prompted.</p>
                                <br/>
                                <Heading>Already have a LimeLoop Brand Account?</Heading>
                                <p>Make sure you’ve entered the correct shopify domain into your user profile. To update it, in the LimeLoop App, click on the circle in the upper right corner, and choose “Settings”. Then enter your shopify domain in the space provided.</p>
                                <img src={form} width="75%" />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
        </Page>
        );
    }
}

export default Welcome;