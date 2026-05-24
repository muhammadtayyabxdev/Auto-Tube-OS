import Head from 'next/head';


import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/emails.module.css';
import { Check, Lightbulb, Clock, Play } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const renderSubjectText = (subject: string) => {
  if (subject.startsWith('<Clock size={16} />')) {
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', verticalAlign: 'middle' }}><Clock size={16} /> {subject.replace('<Clock size={16} /> ', '')}</span>;
  }
  if (subject.startsWith('<Play size={16} />')) {
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', verticalAlign: 'middle' }}><Play size={16} /> {subject.replace('<Play size={16} /> ', '')}</span>;
  }
  return subject;
};

interface EmailTemplate {
  id: string;
  name: string;
  dotColor: string;
  subject: string;
  from: string;
  html: string;
}

const templates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    dotColor: 'var(--green)',
    subject: "Welcome to AutoTubeOS — here's how to get started",
    from: 'Ahmed at AutoTubeOS <hello@autotubeos.com>',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to AutoTubeOS</title>
  <style>
    /* Hide scrollbars completely inside the preview */
    ::-webkit-scrollbar { display: none; }
    html, body { -ms-overflow-style: none; scrollbar-width: none; overflow-y: auto; overflow-x: hidden; }
  </style>

</head>
<body style="margin:0;padding:0;background-color:#0d0f16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#eef0f6;font-size:16px;line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0f16;padding:0;">
    <tr>
      <td>
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0d0f16;border:none;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#060608;padding:28px 32px;text-align:center;">
              <span style="font-family:'Poppins',sans-serif;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">AutoTube<span style="color:#ff3d3d;">OS</span></span>
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="padding:40px 32px 32px;text-align:center;">
              <div style="font-size:11px;font-weight:700;color:#ff3d3d;background-color:rgba(255,61,61,0.1);display:inline-block;padding:4px 12px;border-radius:100px;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px;">Welcome</div>
              <h1 style="font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 10px;">You're in. Let's build your channel system.</h1>
              <p style="font-size:15px;color:#a0aec0;line-height:1.6;margin:0;">Welcome to AutoTubeOS, Ahmed. Your 14-day free trial starts now.</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;"><div style="height:1px;background-color:rgba(255,255,255,0.08);"></div></td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">Hey Ahmed,</p>
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">You just joined 1,200+ creators who are building YouTube channels that run without them being glued to their desk 24/7. That's a big deal — and we're glad you're here.</p>
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">Here's what your workspace is ready for right now:</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#12151e;border-radius:10px;margin:16px 0;padding:12px 18px;">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;"><Check size={28} /></span>
                    <strong style="color:#ffffff;">Topic Finder</strong> — AI-ranked video ideas for your niche, updated daily
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;"><Check size={28} /></span>
                    <strong style="color:#ffffff;">Script Generator</strong> — 8 formats, hooks included, ready in 60 seconds
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;"><Check size={28} /></span>
                    <strong style="color:#ffffff;">Shorts Repurposer</strong> — Turn 1 video into 5 Shorts automatically
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;"><Check size={28} /></span>
                    <strong style="color:#ffffff;">Content Calendar</strong> — Schedule your entire month in one view
                  </td>
                </tr>
              </table>

              <p style="margin:14px 0 0;color:#eef0f6;font-size:15px;line-height:1.7;"><strong style="color:#ffffff;">Recommended first step:</strong> Go to Topic Finder, enter your niche, and let AI find your first 5 video ideas. Takes about 2 minutes.</p>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="text-align:center;padding:8px 32px 32px;">
              <a href="https://autotubeos.com/dashboard" style="display:inline-block;background-color:#ff3d3d;color:#ffffff;text-decoration:none;border-radius:10px;padding:14px 36px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(255,61,61,0.25);">Open Your Dashboard →</a>
            </td>
          </tr>
          <!-- Bottom Info / Stats -->
          <tr>
            <td style="padding:0 32px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                <tr>
                  <td width="30%" align="center" style="background-color:#12151e;border-radius:8px;padding:14px 8px;">
                    <div style="font-size:22px;font-weight:800;color:#ff3d3d;">73%</div>
                    <div style="font-size:11px;color:#a0aec0;margin-top:2px;">Time saved per video</div>
                  </td>
                  <td width="5%"></td>
                  <td width="30%" align="center" style="background-color:#12151e;border-radius:8px;padding:14px 8px;">
                    <div style="font-size:22px;font-weight:800;color:#ff3d3d;">3×</div>
                    <div style="font-size:11px;color:#a0aec0;margin-top:2px;">More output</div>
                  </td>
                  <td width="5%"></td>
                  <td width="30%" align="center" style="background-color:#12151e;border-radius:8px;padding:14px 8px;">
                    <div style="font-size:22px;font-weight:800;color:#ff3d3d;">14</div>
                    <div style="font-size:11px;color:#a0aec0;margin-top:2px;">Days free</div>
                  </td>
                </tr>
              </table>
              <p style="font-size:13px;color:#a0aec0;margin:0;line-height:1.6;">Questions? Just reply to this email — it goes straight to me.<br>— Ahmed K., Founder of AutoTubeOS</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0f16;padding:20px 32px;text-align:center;font-size:12px;color:#a0aec0;line-height:1.7;border-top:1px solid rgba(255,255,255,0.08);">
              AutoTubeOS · Lahore, Pakistan<br>
              <a href="#" style="color:#ff3d3d;text-decoration:none;">Unsubscribe</a> · <a href="#" style="color:#ff3d3d;text-decoration:none;">Privacy Policy</a> · <a href="#" style="color:#ff3d3d;text-decoration:none;">Help Center</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: 'trial',
    name: 'Trial Ending (Day 12)',
    dotColor: 'var(--amber)',
    subject: '<Clock size={16} /> Your free trial ends in 2 days',
    from: 'Ahmed at AutoTubeOS <hello@autotubeos.com>',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Trial Ending</title>
  <style>
    /* Hide scrollbars completely inside the preview */
    ::-webkit-scrollbar { display: none; }
    html, body { -ms-overflow-style: none; scrollbar-width: none; overflow-y: auto; overflow-x: hidden; }
  </style>

</head>
<body style="margin:0;padding:0;background-color:#0d0f16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#eef0f6;font-size:16px;line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0f16;padding:0;">
    <tr>
      <td>
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0d0f16;border:none;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#060608;padding:28px 32px;text-align:center;">
              <span style="font-family:'Poppins',sans-serif;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">AutoTube<span style="color:#ff3d3d;">OS</span></span>
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="padding:40px 32px 32px;text-align:center;">
              <span style="font-size:48px;margin-bottom:16px;display:block;"><Clock size={28} /></span>
              <h1 style="font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 10px;">Your trial ends in 2 days.</h1>
              <p style="font-size:15px;color:#a0aec0;line-height:1.6;margin:0;">Don't lose access to your workspace — upgrade now and keep everything.</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;"><div style="height:1px;background-color:rgba(255,255,255,0.08);"></div></td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">Hey Ahmed,</p>
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">Your 14-day free trial of AutoTubeOS ends on <strong style="color:#ffffff;">May 19, 2026</strong>. After that, you'll lose access to:</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:10px;margin:16px 0;padding:16px 18px;">
                <tr>
                  <td>
                    <div style="font-weight:700;color:#f59e0b;margin-bottom:6px;font-size:14px;"><AlertTriangle size={16} /> What you'll lose on May 19:</div>
                    <p style="color:#eef0f6;font-size:14px;margin:0;line-height:1.5;">Unlimited topic ideas, script generation, Shorts Repurposer, Competitor Intelligence, Retention Optimizer, and your Content Calendar.</p>
                  </td>
                </tr>
              </table>

              <p style="margin:14px 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">You've already generated <strong style="color:#ffffff;">3 scripts</strong> and found <strong style="color:#ffffff;">12 video ideas</strong> during your trial. Don't let that momentum stop.</p>
              <p style="margin:0;color:#eef0f6;font-size:15px;line-height:1.7;"><strong style="color:#ffffff;">Pro plan is $29/month</strong> — less than the cost of one hour of a freelancer's time, but it replaces your entire tool stack.</p>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="text-align:center;padding:8px 32px 24px;">
              <a href="https://autotubeos.com/pricing" style="display:inline-block;background-color:#ff3d3d;color:#ffffff;text-decoration:none;border-radius:10px;padding:14px 36px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(255,61,61,0.25);">Upgrade to Pro — $29/mo →</a>
            </td>
          </tr>
          <!-- Bottom links -->
          <tr>
            <td style="padding:0 32px 28px;text-align:center;font-size:13px;color:#a0aec0;">
              <p style="margin:0 0 16px;">Or <a href="https://autotubeos.com/dashboard" style="color:#ff3d3d;text-decoration:none;">continue with the Free plan</a> (5 ideas/mo, 3 scripts/mo)</p>
              <p style="margin:0;">Questions? Reply to this email anytime.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0f16;padding:20px 32px;text-align:center;font-size:12px;color:#a0aec0;line-height:1.7;border-top:1px solid rgba(255,255,255,0.08);">
              AutoTubeOS · Lahore, Pakistan<br>
              <a href="#" style="color:#ff3d3d;text-decoration:none;">Unsubscribe</a> · <a href="#" style="color:#ff3d3d;text-decoration:none;">Privacy Policy</a> · <a href="#" style="color:#ff3d3d;text-decoration:none;">Manage Subscription</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: 'invoice',
    name: 'Invoice / Receipt',
    dotColor: '#3b82f6',
    subject: 'Your AutoTubeOS receipt for May 2026',
    from: 'AutoTubeOS Billing <billing@autotubeos.com>',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Receipt Invoice</title>
  <style>
    /* Hide scrollbars completely inside the preview */
    ::-webkit-scrollbar { display: none; }
    html, body { -ms-overflow-style: none; scrollbar-width: none; overflow-y: auto; overflow-x: hidden; }
  </style>

</head>
<body style="margin:0;padding:0;background-color:#0d0f16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#eef0f6;font-size:16px;line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0f16;padding:0;">
    <tr>
      <td>
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0d0f16;border:none;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#060608;padding:28px 32px;text-align:center;">
              <span style="font-family:'Poppins',sans-serif;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">AutoTube<span style="color:#ff3d3d;">OS</span></span>
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="padding:40px 32px 24px;text-align:center;">
              <div style="font-size:11px;font-weight:700;color:#ff3d3d;background-color:rgba(255,61,61,0.1);display:inline-block;padding:4px 12px;border-radius:100px;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px;">Receipt</div>
              <h1 style="font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 10px;">Payment confirmed.</h1>
              <p style="font-size:15px;color:#a0aec0;line-height:1.6;margin:0;">Thanks for subscribing to AutoTubeOS Pro. Here's your receipt.</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;"><div style="height:1px;background-color:rgba(255,255,255,0.08);"></div></td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;margin:16px 0;">
                <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
                  <th style="text-align:left;padding:10px 12px;background-color:#12151e;color:#a0aec0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;border-radius:4px 0 0 4px;">Description</th>
                  <th style="text-align:right;padding:10px 12px;background-color:#12151e;color:#a0aec0;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;border-radius:0 4px 4px 0;width:100px;">Amount</th>
                </tr>
                <tr>
                  <td style="padding:16px 12px;border-bottom:1px solid rgba(255,255,255,0.08);color:#eef0f6;">
                    <strong style="color:#ffffff;">AutoTubeOS Pro Plan</strong><br>
                    <span style="font-size:12px;color:#a0aec0;">May 1 – May 31, 2026</span>
                  </td>
                  <td style="text-align:right;padding:16px 12px;border-bottom:1px solid rgba(255,255,255,0.08);color:#eef0f6;font-weight:600;">$29.00</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.08);color:#a0aec0;font-size:13px;">Tax (0%)</td>
                  <td style="text-align:right;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.08);color:#a0aec0;font-size:13px;">$0.00</td>
                </tr>
                <tr style="font-weight:700;color:#ffffff;">
                  <td style="padding:16px 12px;border-top:2px solid rgba(255,255,255,0.15);font-size:15px;">Total charged</td>
                  <td style="text-align:right;padding:16px 12px;border-top:2px solid rgba(255,255,255,0.15);font-size:15px;color:#ff3d3d;">$29.00</td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#12151e;border-radius:8px;padding:16px;margin-top:16px;font-size:13px;color:#a0aec0;line-height:1.6;">
                <tr>
                  <td style="padding-bottom:6px;">Invoice #</td>
                  <td align="right" style="color:#ffffff;font-weight:600;">INV-2026-0517</td>
                </tr>
                <tr>
                  <td style="padding-bottom:6px;">Payment method</td>
                  <td align="right" style="color:#ffffff;">Visa •••• 4242</td>
                </tr>
                <tr>
                  <td style="padding-bottom:6px;">Billing date</td>
                  <td align="right" style="color:#ffffff;">May 1, 2026</td>
                </tr>
                <tr>
                  <td>Next billing</td>
                  <td align="right" style="color:#ffffff;">June 1, 2026</td>
                </tr>
              </table>
              
              <p style="margin:20px 0 0;font-size:14px;color:#a0aec0;">Need to update your billing info, cancel, or download a PDF receipt? Visit your <a href="https://autotubeos.com/settings" style="color:#ff3d3d;text-decoration:none;font-weight:500;">billing settings</a>.</p>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="text-align:center;padding:8px 32px 32px;">
              <a href="https://autotubeos.com/dashboard" style="display:inline-block;background-color:#ff3d3d;color:#ffffff;text-decoration:none;border-radius:10px;padding:14px 36px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(255,61,61,0.25);">Go to Dashboard →</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0f16;padding:20px 32px;text-align:center;font-size:12px;color:#a0aec0;line-height:1.7;border-top:1px solid rgba(255,255,255,0.08);">
              AutoTubeOS · Lahore, Pakistan<br>
              Questions? <a href="mailto:billing@autotubeos.com" style="color:#ff3d3d;text-decoration:none;">billing@autotubeos.com</a><br>
              <a href="#" style="color:#ff3d3d;text-decoration:none;">Unsubscribe</a> · <a href="#" style="color:#ff3d3d;text-decoration:none;">Privacy Policy</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: 'onboarding2',
    name: 'Onboarding Day 3',
    dotColor: 'var(--red)',
    subject: '<Play size={16} /> Day 3 tip: The fastest way to get your first viral idea',
    from: 'Ahmed at AutoTubeOS <hello@autotubeos.com>',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Onboarding Day 3</title>
  <style>
    /* Hide scrollbars completely inside the preview */
    ::-webkit-scrollbar { display: none; }
    html, body { -ms-overflow-style: none; scrollbar-width: none; overflow-y: auto; overflow-x: hidden; }
  </style>

</head>
<body style="margin:0;padding:0;background-color:#0d0f16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#eef0f6;font-size:16px;line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0f16;padding:0;">
    <tr>
      <td>
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0d0f16;border:none;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#060608;padding:28px 32px;text-align:center;">
              <span style="font-family:'Poppins',sans-serif;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">AutoTube<span style="color:#ff3d3d;">OS</span></span>
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="padding:40px 32px 32px;text-align:center;">
              <span style="font-size:48px;margin-bottom:16px;display:block;"><Play size={28} /></span>
              <h1 style="font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 10px;">Day 3 tip: Find your first viral idea in under 5 minutes.</h1>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;"><div style="height:1px;background-color:rgba(255,255,255,0.08);"></div></td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">Hey Ahmed,</p>
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">Most new creators spend <strong style="color:#ffffff;">hours</strong> trying to find the "perfect" first video idea. Here's the truth: the best idea isn't the one you think of — it's the one your audience is already searching for.</p>
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">Here's the fastest way to find it using AutoTubeOS:</p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#12151e;border-radius:10px;margin:16px 0;padding:16px 18px;line-height:1.8;">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">1</span>
                    Open <strong style="color:#ffffff;">Topic Finder</strong> in your dashboard
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">2</span>
                    Type your niche (e.g. "personal finance Pakistan")
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">3</span>
                    Sort by <strong style="color:#ffffff;">Low Competition</strong> + <strong style="color:#ffffff;">High RPM</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">4</span>
                    Pick the idea with score <strong style="color:#ffffff;">8.0+</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#22c55e;background-color:rgba(34,197,94,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">5</span>
                    Hit <strong style="color:#ffffff;">"Write Script"</strong> — done in 60 seconds
                  </td>
                </tr>
              </table>

              <p style="margin:14px 0 0;color:#eef0f6;font-size:15px;line-height:1.7;">That's it. Most creators find their first idea within 3 minutes of trying this. Give it a go today.</p>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="text-align:center;padding:8px 32px 32px;">
              <a href="https://autotubeos.com/dashboard?view=topics" style="display:inline-block;background-color:#ff3d3d;color:#ffffff;text-decoration:none;border-radius:10px;padding:14px 36px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(255,61,61,0.25);">Open Topic Finder →</a>
            </td>
          </tr>
          <!-- Bottom signature -->
          <tr>
            <td style="padding:0 32px 28px;text-align:center;font-size:13px;color:#a0aec0;">
              <p style="margin:0;">— Ahmed K., Founder</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0f16;padding:20px 32px;text-align:center;font-size:12px;color:#a0aec0;line-height:1.7;border-top:1px solid rgba(255,255,255,0.08);">
              AutoTubeOS · Lahore, Pakistan<br>
              <a href="#" style="color:#ff3d3d;text-decoration:none;">Unsubscribe</a> · <a href="#" style="color:#ff3d3d;text-decoration:none;">Privacy Policy</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: 'reactivate',
    name: 'Win-back / Reactivate',
    dotColor: '#a855f7',
    subject: "We miss you — here's 30% off to come back",
    from: 'Ahmed at AutoTubeOS <hello@autotubeos.com>',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We Miss You</title>
  <style>
    /* Hide scrollbars completely inside the preview */
    ::-webkit-scrollbar { display: none; }
    html, body { -ms-overflow-style: none; scrollbar-width: none; overflow-y: auto; overflow-x: hidden; }
  </style>

</head>
<body style="margin:0;padding:0;background-color:#0d0f16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#eef0f6;font-size:16px;line-height:1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0f16;padding:0;">
    <tr>
      <td>
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0d0f16;border:none;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#060608;padding:28px 32px;text-align:center;">
              <span style="font-family:'Poppins',sans-serif;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">AutoTube<span style="color:#ff3d3d;">OS</span></span>
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="padding:40px 32px 32px;text-align:center;">
              <div style="font-size:11px;font-weight:700;color:#ff3d3d;background-color:rgba(255,61,61,0.1);display:inline-block;padding:4px 12px;border-radius:100px;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px;">Update</div>
              <h1 style="font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;margin:0 0 10px;">It's been a while, Ahmed.</h1>
              <p style="font-size:15px;color:#a0aec0;line-height:1.6;margin:0;">We've shipped 6 major features since you left. Come see what's new — on us.</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;"><div style="height:1px;background-color:rgba(255,255,255,0.08);"></div></td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">Hey Ahmed,</p>
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;">You cancelled AutoTubeOS a few weeks ago, and that's okay. But we've been busy — and we think what we've built might change your mind.</p>
              <p style="margin:0 0 14px;color:#eef0f6;font-size:15px;line-height:1.7;"><strong style="color:#ffffff;">What's new since you left:</strong></p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#12151e;border-radius:10px;margin:16px 0;padding:12px 18px;">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#a855f7;background-color:rgba(168,85,247,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">🆕</span>
                    <strong style="color:#ffffff;">AI Agents</strong> — fully automated topic → script → calendar in one click
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#a855f7;background-color:rgba(168,85,247,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">🆕</span>
                    <strong style="color:#ffffff;">Competitor Intelligence 2.0</strong> — now tracks thumbnail patterns too
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#a855f7;background-color:rgba(168,85,247,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">🆕</span>
                    <strong style="color:#ffffff;">Shorts Repurposer</strong> is now 3× faster with better clip detection
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#eef0f6;">
                    <span style="color:#a855f7;background-color:rgba(168,85,247,0.15);border-radius:50%;width:18px;height:18px;display:inline-block;text-align:center;line-height:18px;font-size:11px;margin-right:8px;font-weight:600;">🆕</span>
                    <strong style="color:#ffffff;">Team Collaboration</strong> — manage editors, voiceover artists in one place
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,61,61,0.08);border:1px solid rgba(255,61,61,0.25);border-radius:10px;margin:20px 0;padding:16px 18px;text-align:center;">
                <tr>
                  <td>
                    <div style="font-size:22px;font-weight:800;color:#ff3d3d;margin-bottom:6px;">30% OFF</div>
                    <div style="font-size:14px;color:#eef0f6;font-weight:500;">Use code <strong style="color:#ffffff;">COMEBACK30</strong> at checkout. Valid for 48 hours only.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="text-align:center;padding:0 32px 32px;">
              <a href="https://autotubeos.com/auth" style="display:inline-block;background-color:#ff3d3d;color:#ffffff;text-decoration:none;border-radius:10px;padding:14px 36px;font-size:15px;font-weight:600;box-shadow:0 4px 12px rgba(255,61,61,0.25);">Come Back — 30% Off →</a>
            </td>
          </tr>
          <!-- Bottom note -->
          <tr>
            <td style="padding:0 32px 28px;text-align:center;font-size:13px;color:#a0aec0;">
              <p style="margin:0;">If you're not interested, no worries — we won't email you again about this.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0d0f16;padding:20px 32px;text-align:center;font-size:12px;color:#a0aec0;line-height:1.7;border-top:1px solid rgba(255,255,255,0.08);">
              AutoTubeOS · Lahore, Pakistan<br>
              <a href="#" style="color:#ff3d3d;text-decoration:none;">Unsubscribe</a> · <a href="#" style="color:#ff3d3d;text-decoration:none;">Privacy Policy</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
];

export default function CreatorEmails() {
  const { loading } = useAuth(true);
  const [activeTemplateId, setActiveTemplateId] = useState<string>(templates[0].id);
  const activeTemplate = templates.find((t) => t.id === activeTemplateId) || templates[0];
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showToast, setShowToast] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<string>('650px');

  const adjustIframeHeight = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const doc = iframeRef.current.contentWindow.document;
        const height = doc.documentElement.scrollHeight || doc.body.scrollHeight;
        setIframeHeight(`${height + 30}px`);
      } catch (e) {
        console.error("Failed to adjust iframe height", e);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(adjustIframeHeight, 100);
    return () => clearTimeout(timer);
  }, [activeTemplateId, deviceMode]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07080c',
        color: '#eef0f6',
        fontFamily: 'sans-serif'
      }}>
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#ff3d3d" style={{ marginBottom: '16px' }}>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="3">
              <circle strokeOpacity=".1" cx="18" cy="18" r="18" stroke="#ffffff"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
        <div style={{ fontSize: '12px', color: '#a0aec0', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Verifying Session...
        </div>
      </div>
    );
  }

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(activeTemplate.html);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleSelectTemplate = (id: string) => {
    setActiveTemplateId(id);
  };

  return (
    <div className={styles.shell}>
      <Head>
        <title>Creator Email Templates — AutoTube OS</title>
        <meta name="description" content="Access 5 premium, retention-optimized email templates designed for outreach, newsletter, and partnerships." />
      </Head>

      {/* GLOBAL NAVIGATION SIDEBAR */}
      <Sidebar />

      {/* EMAIL BUILDER WORKSPACE */}
      <div className={styles.main}>
        {/* TOPBAR */}
        <div className={styles.topbar}>
          <div className={styles.tbTitle}>{activeTemplate.name}</div>
          <div className={styles.previewToggle}>
            <div
              className={`${styles.ptBtn} ${viewMode === 'preview' ? styles.on : ''}`}
              onClick={() => setViewMode('preview')}
            >
              Preview
            </div>
            <div
              className={`${styles.ptBtn} ${viewMode === 'code' ? styles.on : ''}`}
              onClick={() => setViewMode('code')}
            >
              HTML Code
            </div>
          </div>
          <button className={styles.copyBtn} onClick={handleCopyHtml}>
            Copy HTML
          </button>
        </div>

        {/* WORKSPACE CONTENT */}
        <div className={styles.content}>
          {/* EMAIL SELECTOR SIDEBAR (COLUMN 1) */}
          <div className={styles.emailSelectorSidebar}>
            <div className={styles.sbLabel}>Email Templates</div>
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className={`${styles.sbItem} ${activeTemplateId === tpl.id ? styles.on : ''}`}
                onClick={() => handleSelectTemplate(tpl.id)}
              >
                <div className={styles.sbDot} style={{ backgroundColor: tpl.dotColor }}></div>
                {tpl.name}
              </div>
            ))}
            <div
              style={{
                marginTop: '20px',
                padding: '12px',
                background: 'var(--s2)',
                borderRadius: '8px',
                fontSize: '11px',
                color: 'var(--muted2)',
                lineHeight: '1.6',
              }}
            >
              <Lightbulb size={20} /> All emails are plain HTML — copy the source code and paste into Postmark, SendGrid, or Mailchimp.
            </div>
          </div>

          {/* MAIN PREVIEW CONTAINER (COLUMN 2) */}
          <div className={styles.previewWorkspace}>
            {viewMode === 'preview' ? (
              <div className={styles.emailPreviewWrap}>
                <div className={styles.emailChrome}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className={styles.emailField} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      <b>From:</b> {activeTemplate.from}
                    </div>
                    <div className={styles.emailField} style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '4px' }}>
                      <b>Subject:</b> {renderSubjectText(activeTemplate.subject)}
                    </div>
                  </div>
                  <div className={styles.emailDevice}>
                    <button
                      className={`${styles.devBtn} ${deviceMode === 'desktop' ? styles.on : ''}`}
                      onClick={() => setDeviceMode('desktop')}
                    >
                      Desktop
                    </button>
                    <button
                      className={`${styles.devBtn} ${deviceMode === 'mobile' ? styles.on : ''}`}
                      onClick={() => setDeviceMode('mobile')}
                    >
                      Mobile
                    </button>
                  </div>
                </div>
                <div className={`${styles.emailFrame} ${deviceMode === 'mobile' ? styles.mobile : ''}`}>
                  <iframe
                    key={`${activeTemplateId}-${deviceMode}`}
                    ref={iframeRef}
                    srcDoc={activeTemplate.html}
                    title="Email Preview"
                    className={styles.emailIframe}
                    scrolling="no"
                    onLoad={adjustIframeHeight}
                    style={{ height: iframeHeight }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ maxWidth: '780px', margin: '20px auto 40px' }}>
                <pre className={styles.codeView}>
                  <code>{activeTemplate.html}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOAST SUCCESS ALERT */}
      <div className={`${styles.toast} ${showToast ? styles.show : ''}`}>
        <Check size={16} /> HTML copied to clipboard!
      </div>
    </div>
  );
}
