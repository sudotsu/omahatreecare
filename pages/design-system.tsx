import React, { useState } from 'react';
import Head from 'next/head';
import {
  Container,
  Section,
  Button,
  Card,
  Badge,
  Divider,
  Alert,
  Input,
  Select,
  Textarea,
  Checkbox,
  Radio,
  FieldError,
  FormRow,
} from '../src/components/primitives';

/**
 * Kitchen Sink Demo Page
 * Showcases all design system primitives
 */
export default function DesignSystemPage() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');

  return (
    <>
      <Head>
        <title>Design System Kitchen Sink | Midwest Roots</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <Section spacing="md" className="bg-neutral-900 text-white">
          <Container size="xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Design System
            </h1>
            <p className="text-lg text-neutral-400">
              Kitchen sink demo of all primitive components
            </p>
          </Container>
        </Section>

        {/* Typography */}
        <Section spacing="lg">
          <Container size="xl">
            <h2 className="text-3xl font-bold mb-8">Typography</h2>
            <div className="space-y-4">
              <div className="text-6xl font-bold tracking-tight">
                Heading 6XL
              </div>
              <div className="text-5xl font-bold tracking-tight">
                Heading 5XL
              </div>
              <div className="text-4xl font-bold tracking-tight">
                Heading 4XL
              </div>
              <div className="text-3xl font-bold tracking-tight">
                Heading 3XL
              </div>
              <div className="text-2xl font-semibold">Heading 2XL</div>
              <div className="text-xl font-semibold">Heading XL</div>
              <div className="text-lg">Text Large</div>
              <div className="text-base">Text Base (body text)</div>
              <div className="text-sm">Text Small</div>
              <div className="text-xs">Text Extra Small</div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Colors */}
        <Section spacing="lg">
          <Container size="xl">
            <h2 className="text-3xl font-bold mb-8">Color Palette</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Primary Green</h3>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-24 h-24 bg-primary-50 rounded-lg flex items-end p-2">
                    <span className="text-xs">50</span>
                  </div>
                  <div className="w-24 h-24 bg-primary-100 rounded-lg flex items-end p-2">
                    <span className="text-xs">100</span>
                  </div>
                  <div className="w-24 h-24 bg-primary-500 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">500</span>
                  </div>
                  <div className="w-24 h-24 bg-primary-600 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">600</span>
                  </div>
                  <div className="w-24 h-24 bg-primary-700 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">700</span>
                  </div>
                  <div className="w-24 h-24 bg-primary-900 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">900</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Alert Orange</h3>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-24 h-24 bg-alert-400 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">400</span>
                  </div>
                  <div className="w-24 h-24 bg-alert-500 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">500</span>
                  </div>
                  <div className="w-24 h-24 bg-alert-600 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">600</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Neutral (Concrete)</h3>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-24 h-24 bg-neutral-50 rounded-lg border border-neutral-200 flex items-end p-2">
                    <span className="text-xs">50</span>
                  </div>
                  <div className="w-24 h-24 bg-neutral-100 rounded-lg flex items-end p-2">
                    <span className="text-xs">100</span>
                  </div>
                  <div className="w-24 h-24 bg-neutral-200 rounded-lg flex items-end p-2">
                    <span className="text-xs">200</span>
                  </div>
                  <div className="w-24 h-24 bg-neutral-400 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">400</span>
                  </div>
                  <div className="w-24 h-24 bg-neutral-600 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">600</span>
                  </div>
                  <div className="w-24 h-24 bg-neutral-800 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">800</span>
                  </div>
                  <div className="w-24 h-24 bg-neutral-900 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">900</span>
                  </div>
                  <div className="w-24 h-24 bg-neutral-950 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">950</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Steel Blue-Gray</h3>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-24 h-24 bg-steel-50 rounded-lg border border-neutral-200 flex items-end p-2">
                    <span className="text-xs">50</span>
                  </div>
                  <div className="w-24 h-24 bg-steel-600 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">600</span>
                  </div>
                  <div className="w-24 h-24 bg-steel-700 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">700</span>
                  </div>
                  <div className="w-24 h-24 bg-steel-800 rounded-lg flex items-end p-2 text-white">
                    <span className="text-xs">800</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Buttons */}
        <Section spacing="lg">
          <Container size="xl">
            <h2 className="text-3xl font-bold mb-8">Buttons</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="emergency">Emergency Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Sizes</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Cards */}
        <Section spacing="lg" className="bg-white">
          <Container size="xl">
            <h2 className="text-3xl font-bold mb-8">Cards</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card variant="standard">
                <h3 className="text-xl font-semibold mb-2">Standard Card</h3>
                <p className="text-neutral-600">
                  This is a standard card with rounded-lg, padding-6, and shadow-sm.
                </p>
              </Card>

              <Card variant="feature" hover>
                <h3 className="text-xl font-semibold mb-2">Feature Card (Hover)</h3>
                <p className="text-neutral-600">
                  This is a feature card with rounded-xl, padding-8, shadow-md, and hover effect.
                </p>
              </Card>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Badges */}
        <Section spacing="lg">
          <Container size="xl">
            <h2 className="text-3xl font-bold mb-8">Badges</h2>

            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Primary Badge</Badge>
              <Badge variant="steel">Steel Badge</Badge>
              <Badge variant="neutral">Neutral Badge</Badge>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Alerts */}
        <Section spacing="lg">
          <Container size="xl">
            <h2 className="text-3xl font-bold mb-8">Alerts</h2>

            <div className="space-y-4">
              <Alert variant="info">
                <strong>Info:</strong> This is an informational message.
              </Alert>
              <Alert variant="success">
                <strong>Success:</strong> Your operation completed successfully.
              </Alert>
              <Alert variant="warning">
                <strong>Warning:</strong> Please review this carefully.
              </Alert>
              <Alert variant="error">
                <strong>Error:</strong> Something went wrong.
              </Alert>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Form Elements */}
        <Section spacing="lg" className="bg-white">
          <Container size="md">
            <h2 className="text-3xl font-bold mb-8">Form Elements</h2>

            <div className="space-y-6">
              <FormRow label="Full Name" htmlFor="name" required>
                <Input id="name" placeholder="Enter your name" />
              </FormRow>

              <FormRow label="Email" htmlFor="email" required>
                <Input id="email" type="email" placeholder="your@email.com" />
              </FormRow>

              <FormRow label="Email (Error State)" htmlFor="email-error" error="Please enter a valid email address">
                <Input id="email-error" type="email" error placeholder="your@email.com" />
              </FormRow>

              <FormRow label="Service Type" htmlFor="service">
                <Select id="service">
                  <option value="">Select a service</option>
                  <option value="removal">Tree Removal</option>
                  <option value="trimming">Tree Trimming</option>
                  <option value="stump">Stump Grinding</option>
                </Select>
              </FormRow>

              <FormRow label="Message" htmlFor="message">
                <Textarea id="message" placeholder="Tell us about your project..." />
              </FormRow>

              <div className="space-y-3">
                <Checkbox
                  label="I agree to the terms and conditions"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
                <Checkbox label="Send me updates about tree care" />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-neutral-900">Property Type:</p>
                <Radio
                  name="property"
                  label="Residential"
                  value="residential"
                  checked={radioValue === 'option1'}
                  onChange={() => setRadioValue('option1')}
                />
                <Radio
                  name="property"
                  label="Commercial"
                  value="commercial"
                  checked={radioValue === 'option2'}
                  onChange={() => setRadioValue('option2')}
                />
              </div>

              <FieldError>This is what a field error looks like</FieldError>

              <div className="flex gap-4">
                <Button type="submit">Submit Form</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Spacing */}
        <Section spacing="lg">
          <Container size="xl">
            <h2 className="text-3xl font-bold mb-8">Spacing Scale (8px base)</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-primary-500"></div>
                <span className="text-sm">space-1 (4px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-primary-500"></div>
                <span className="text-sm">space-2 (8px - base)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-8 bg-primary-500"></div>
                <span className="text-sm">space-3 (12px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-8 bg-primary-500"></div>
                <span className="text-sm">space-4 (16px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-8 bg-primary-500"></div>
                <span className="text-sm">space-6 (24px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary-500"></div>
                <span className="text-sm">space-8 (32px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-primary-500"></div>
                <span className="text-sm">space-12 (48px)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-8 bg-primary-500"></div>
                <span className="text-sm">space-16 (64px)</span>
              </div>
            </div>
          </Container>
        </Section>

        <Divider />

        {/* Shadows */}
        <Section spacing="lg" className="bg-white">
          <Container size="xl">
            <h2 className="text-3xl font-bold mb-8">Shadows</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 bg-white shadow-sm rounded-lg border border-neutral-200">
                <p className="text-sm font-medium">shadow-sm</p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <p className="text-sm font-medium">shadow-md</p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <p className="text-sm font-medium">shadow-lg</p>
              </div>
              <div className="p-6 bg-white shadow-xl rounded-lg">
                <p className="text-sm font-medium">shadow-xl</p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Footer */}
        <Section spacing="md" className="bg-neutral-900 text-white">
          <Container size="xl">
            <p className="text-center text-neutral-400">
              Design System Kitchen Sink - Development Only
            </p>
          </Container>
        </Section>
      </div>
    </>
  );
}
